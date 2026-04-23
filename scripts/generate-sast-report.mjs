import { mkdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'

const lintReportPath = join(process.cwd(), 'reports', 'lint', 'eslint.json')
const sastDir = join(process.cwd(), 'reports', 'sast')
const outputPath = join(sastDir, 'eslint-security.json')

if (!existsSync(lintReportPath)) {
  console.error('Missing reports/lint/eslint.json. Run lint:report:json first.')
  process.exit(1)
}

mkdirSync(sastDir, { recursive: true })

const raw = JSON.parse(readFileSync(lintReportPath, 'utf8'))
const securityOnly = raw
  .map((file) => ({
    filePath: file.filePath,
    messages: (file.messages || []).filter(
      (message) =>
        typeof message.ruleId === 'string' &&
        message.ruleId.startsWith('security/')
    ),
    warningCount: 0,
    errorCount: 0,
  }))
  .filter((file) => file.messages.length > 0)

for (const file of securityOnly) {
  file.errorCount = file.messages.filter((m) => m.severity === 2).length
  file.warningCount = file.messages.filter((m) => m.severity === 1).length
}

const summary = {
  generatedAt: new Date().toISOString(),
  tool: 'eslint-plugin-security',
  totalFilesWithFindings: securityOnly.length,
  totalFindings: securityOnly.reduce((acc, f) => acc + f.messages.length, 0),
  totalErrors: securityOnly.reduce((acc, f) => acc + f.errorCount, 0),
  totalWarnings: securityOnly.reduce((acc, f) => acc + f.warningCount, 0),
  findings: securityOnly,
}

writeFileSync(outputPath, JSON.stringify(summary, null, 2), 'utf8')
console.log(`Generated ${outputPath}`)
