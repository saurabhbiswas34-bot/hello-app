import { readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const inputPath = join(process.cwd(), 'reports', 'a11y', 'axe-static.json')
const outputPath = join(process.cwd(), 'reports', 'a11y', 'axe-static.html')

const raw = JSON.parse(readFileSync(inputPath, 'utf8'))
const violations = raw.violations || []
const passes = raw.passes || []
const incomplete = raw.incomplete || []

const rows = violations
  .map(
    (v) =>
      `<tr><td>${v.id}</td><td>${v.impact || 'unknown'}</td><td>${v.nodes?.length || 0}</td><td>${v.helpUrl || ''}</td></tr>`
  )
  .join('')

const html = `<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <title>Axe Static Report</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 24px; }
    h1, h2 { margin-bottom: 8px; }
    .meta { margin-bottom: 20px; }
    table { border-collapse: collapse; width: 100%; }
    th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
    th { background: #f5f5f5; }
  </style>
</head>
<body>
  <h1>Axe Static Accessibility Report</h1>
  <div class="meta">
    <p><strong>Violations:</strong> ${violations.length}</p>
    <p><strong>Passes:</strong> ${passes.length}</p>
    <p><strong>Incomplete:</strong> ${incomplete.length}</p>
  </div>
  <h2>Violation Details</h2>
  <table>
    <thead>
      <tr><th>Rule</th><th>Impact</th><th>Affected Nodes</th><th>Help URL</th></tr>
    </thead>
    <tbody>
      ${rows || '<tr><td colspan="4">No violations found</td></tr>'}
    </tbody>
  </table>
</body>
</html>`

writeFileSync(outputPath, html, 'utf8')
