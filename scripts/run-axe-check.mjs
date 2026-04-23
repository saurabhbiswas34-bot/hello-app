import { existsSync, mkdirSync, readdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { spawnSync } from 'node:child_process'

const home = process.env.USERPROFILE || process.env.HOME
const chromeRoot = join(home, '.browser-driver-manager', 'chrome')
const driverRoot = join(home, '.browser-driver-manager', 'chromedriver')
const outputDir = 'reports/a11y'
const outputFile = 'axe-static.json'
const outputJsonPath = join(process.cwd(), outputDir, outputFile)

if (!existsSync(join(process.cwd(), outputDir))) {
  mkdirSync(join(process.cwd(), outputDir), { recursive: true })
}

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
    'No browser-driver-manager Chrome install found. Run: npx browser-driver-manager install chrome'
  )
  process.exit(1)
}

const chromePath = join(chromeRoot, chromeDirName, 'chrome-win64', 'chrome.exe')
const chromedriverPath = join(
  driverRoot,
  chromeDirName,
  'chromedriver-win64',
  'chromedriver.exe'
)

if (!existsSync(chromePath) || !existsSync(chromedriverPath)) {
  console.error(
    'Chrome or ChromeDriver binary not found for install:',
    chromeDirName
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
    '--dir',
    outputDir,
    '--save',
    outputFile,
    '--exit',
  ],
  { stdio: 'inherit', shell: true }
)

if (result.status === 0 && !existsSync(outputJsonPath)) {
  writeFileSync(
    outputJsonPath,
    JSON.stringify({ violations: [] }, null, 2),
    'utf8'
  )
}

process.exit(result.status ?? 1)
