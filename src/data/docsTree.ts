import type { DocFolderNode, DocTreeNode } from '../types/docs'

const rawMarkdownModules = import.meta.glob('../../docs/**/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

const toRelative = (key: string): string =>
  key.replace(/^\.\.\/\.\.\/docs\//, '')

const sortTree = (node: DocFolderNode): void => {
  node.children.sort((a, b) => {
    if (a.type !== b.type) return a.type === 'folder' ? -1 : 1
    return a.name.localeCompare(b.name)
  })

  node.children.forEach((child) => {
    if (child.type === 'folder') {
      sortTree(child)
    }
  })
}

const buildDocsTree = (): DocFolderNode => {
  const root: DocFolderNode = {
    name: 'docs',
    type: 'folder',
    path: 'docs',
    children: [],
  }

  for (const key of Object.keys(rawMarkdownModules)) {
    const relative = toRelative(key)
    const parts = relative.split('/')
    let cursor: DocFolderNode = root
    let accPath = 'docs'

    parts.forEach((part, index) => {
      accPath = `${accPath}/${part}`
      const isLeaf = index === parts.length - 1

      if (isLeaf) {
        cursor.children.push({
          name: part,
          type: 'file',
          path: accPath,
        })
        return
      }

      let folder = cursor.children.find(
        (child): child is DocFolderNode =>
          child.type === 'folder' && child.name === part
      )

      if (!folder) {
        folder = { name: part, type: 'folder', path: accPath, children: [] }
        cursor.children.push(folder)
      }

      cursor = folder
    })
  }

  sortTree(root)
  return root
}

export const docsTree = buildDocsTree()

export const docsContentByPath = new Map<string, string>(
  Object.entries(rawMarkdownModules).map(([key, value]) => [
    `docs/${toRelative(key)}`,
    value,
  ])
)

export const getInitialExpanded = (): Map<string, boolean> => {
  const expanded = new Map<string, boolean>()
  expanded.set('docs', true)

  const walk = (node: DocTreeNode): void => {
    if (node.type !== 'folder') return
    expanded.set(node.path, true)
    node.children.forEach(walk)
  }

  walk(docsTree)
  return expanded
}

export const getFirstDocPath = (): string | null => {
  const walk = (node: DocTreeNode): string | null => {
    if (node.type === 'file') return node.path

    for (const child of node.children) {
      const found = walk(child)
      if (found) return found
    }

    return null
  }

  return walk(docsTree)
}
