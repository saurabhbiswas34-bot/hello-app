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

const findBinaryRecursively = (rootPath, fileNames) => {
  if (!existsSync(rootPath)) return null
  const stack = [rootPath]
  while (stack.length > 0) {
    const current = stack.pop()
    const entries = readdirSync(current, { withFileTypes: true })
    for (const entry of entries) {
      const fullPath = join(current, entry.name)
      if (entry.isDirectory()) {
        stack.push(fullPath)
        continue
      }
      if (fileNames.includes(entry.name)) {
        return fullPath
      }
    }
  }
  return null
}

const chromeDirName = getLatestVersionDir(chromeRoot)

if (!chromeDirName) {
  console.error(
    'No browser-driver-manager Chrome install found. Run: npx browser-driver-manager install chrome'
  )
  process.exit(1)
}

const chromePath = findBinaryRecursively(join(chromeRoot, chromeDirName), [
  'chrome.exe',
  'chrome',
])

const chromedriverPath = findBinaryRecursively(
  join(driverRoot, chromeDirName),
  ['chromedriver.exe', 'chromedriver']
)

if (
  !chromePath ||
  !chromedriverPath ||
  !existsSync(chromePath) ||
  !existsSync(chromedriverPath)
) {
  console.error(
    'Chrome or ChromeDriver binary not found for install:',
    chromeDirName,
    '\nResolved chromePath:',
    chromePath,
    '\nResolved chromedriverPath:',
    chromedriverPath
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
    '--chrome-options',
    'no-sandbox,disable-dev-shm-usage,headless=new',
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
