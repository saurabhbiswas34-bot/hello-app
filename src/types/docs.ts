export type DocNodeType = 'folder' | 'file'

export interface DocFolderNode {
  name: string
  type: 'folder'
  path: string
  children: DocTreeNode[]
}

export interface DocFileNode {
  name: string
  type: 'file'
  path: string
}

export type DocTreeNode = DocFolderNode | DocFileNode
