import { existsSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import { spawnSync } from 'node:child_process'

const home = process.env.USERPROFILE || process.env.HOME
const chromeRoot = join(home, '.browser-driver-manager', 'chrome')
const driverRoot = join(home, '.browser-driver-manager', 'chromedriver')

const getLatestVersionDir = (rootPath) => {
  if (!existsSync(rootPath)) return null
  const versions = readdirSync(rootPath, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort()
  return versions.at(-1) || null
}

const chromeDirName = getLatestVersionDir(chromeRoot)

if (!chromeDirName) {
  console.error(
    'No browser-driver-manager Chrome install found. Run: npx browser-driver-manager install chrome',
  )
  process.exit(1)
}

const chromePath = join(
  chromeRoot,
  chromeDirName,
  'chrome-win64',
  'chrome.exe',
)
const chromedriverPath = join(
  driverRoot,
  chromeDirName,
  'chromedriver-win64',
  'chromedriver.exe',
)

if (!existsSync(chromePath) || !existsSync(chromedriverPath)) {
  console.error(
    'Chrome or ChromeDriver binary not found for install:',
    chromeDirName,
  )
  process.exit(1)
}

const result = spawnSync(
  'npx',
  [
    'axe',
    'http://localhost:5173',
    '--chrome-path',
    chromePath,
    '--chromedriver-path',
    chromedriverPath,
  ],
  { stdio: 'inherit', shell: true },
)

process.exit(result.status ?? 1)
