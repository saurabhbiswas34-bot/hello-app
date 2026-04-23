import { existsSync, mkdirSync } from 'node:fs'
import { join } from 'node:path'
import { spawnSync } from 'node:child_process'

const reportsDir = join(process.cwd(), 'reports', 'dast')
mkdirSync(reportsDir, { recursive: true })

const checkDocker = spawnSync('docker', ['--version'], {
  shell: true,
  encoding: 'utf8',
})

if (checkDocker.status !== 0) {
  console.error('Docker is required for OWASP ZAP baseline scan but is not available.')
  process.exit(1)
}

const url = process.env.DAST_TARGET_URL || 'http://host.docker.internal:5173'

const args = [
  'run',
  '--rm',
  '--add-host',
  'host.docker.internal:host-gateway',
  '-v',
  `${reportsDir}:/zap/wrk/:rw`,
  'ghcr.io/zaproxy/zaproxy:stable',
  'zap-baseline.py',
  '-t',
  url,
  '-J',
  'zap-baseline.json',
  '-r',
  'zap-baseline.html',
  '-m',
  '5',
]

const run = spawnSync('docker', args, { stdio: 'inherit', shell: true })
process.exit(run.status ?? 1)
