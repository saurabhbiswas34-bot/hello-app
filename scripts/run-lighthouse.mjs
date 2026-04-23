import { mkdirSync } from 'node:fs'
import { join } from 'node:path'
import { spawnSync } from 'node:child_process'

const reportsDir = join(process.cwd(), 'reports', 'dast')
mkdirSync(reportsDir, { recursive: true })

const url = process.env.DAST_TARGET_URL || 'http://localhost:5173'
const outputBase = join(reportsDir, 'lighthouse')

const result = spawnSync(
  'npx',
  [
    'lighthouse',
    url,
    '--quiet',
    '--chrome-flags=--headless --no-sandbox',
    '--output=json',
    '--output=html',
    `--output-path=${outputBase}`,
  ],
  { stdio: 'inherit', shell: true }
)

process.exit(result.status ?? 1)
