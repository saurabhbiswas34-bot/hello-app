import TreeNode from '../atoms/TreeNode'
import type { DocFolderNode } from '../../types/docs'

interface DocTreeProps {
  tree: DocFolderNode
}

function DocTree({ tree }: DocTreeProps) {
  return (
    <nav className="doc-tree" aria-label="Documentation tree">
      <ul className="tree-root">
        {tree.children.map((node) => (
          <TreeNode key={node.path} node={node} />
        ))}
      </ul>
    </nav>
  )
}

export default DocTree
