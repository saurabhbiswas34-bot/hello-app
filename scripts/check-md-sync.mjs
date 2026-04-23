import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join, relative } from 'node:path'

const ROOT = process.cwd()

const SCAN_ROOTS = ['docs', '.cursor/skills', 'README.md']
const SKIP_DIRS = new Set([
  '.git',
  'node_modules',
  'dist',
  'reports',
  '.cursorignore',
])

const FORBIDDEN_PATTERNS = [
  {
    pattern: /\bZustand\b/i,
    reason: 'Use React useReducer/context wording instead of Zustand.',
  },
  {
    pattern: /atoms\s*->\s*templates/i,
    reason: 'Atomic layers should be atoms -> molecules -> organisms.',
  },
  {
    pattern: /src\/store\/useAccordionStore\.(js|ts|tsx)/i,
    reason: 'Accordion store path changed to components/organisms/Accordion/store.',
  },
  {
    pattern: /useAccordionStore\.js/i,
    reason: 'Legacy JS store references should not appear in docs.',
  },
]

function collectMarkdownFiles(targetPath) {
  const absolute = join(ROOT, targetPath)
  const stats = statSync(absolute, { throwIfNoEntry: false })
  if (!stats) return []

  if (stats.isFile()) {
    return absolute.toLowerCase().endsWith('.md') ? [absolute] : []
  }

  const results = []
  for (const entry of readdirSync(absolute, { withFileTypes: true })) {
    if (entry.isDirectory() && SKIP_DIRS.has(entry.name)) continue
    const childRelative = join(targetPath, entry.name)
    results.push(...collectMarkdownFiles(childRelative))
  }
  return results
}

const mdFiles = SCAN_ROOTS.flatMap((root) => collectMarkdownFiles(root))
const violations = []

for (const filePath of mdFiles) {
  const content = readFileSync(filePath, 'utf8')
  for (const { pattern, reason } of FORBIDDEN_PATTERNS) {
    const match = content.match(pattern)
    if (!match) continue
    violations.push({
      file: relative(ROOT, filePath),
      pattern: pattern.toString(),
      sample: match[0],
      reason,
    })
  }
}

if (violations.length > 0) {
  console.error('Markdown sync check failed. Resolve stale references:\n')
  for (const violation of violations) {
    console.error(
      `- ${violation.file}\n  pattern: ${violation.pattern}\n  sample: ${violation.sample}\n  reason: ${violation.reason}\n`
    )
  }
  process.exit(1)
}

console.log(`Markdown sync check passed (${mdFiles.length} files scanned).`)
