import useDocsStore from '../../store/useDocsStore'
import type { DocTreeNode } from '../../types/docs'

const INDENT_PX = 14
const BASE_PADDING_PX = 8

interface TreeNodeProps {
  node: DocTreeNode
  level?: number
}

function TreeNode({ node, level = 0 }: TreeNodeProps) {
  const selectedPath = useDocsStore((state) => state.selectedPath)
  const expanded = useDocsStore((state) => state.expanded)
  const selectDoc = useDocsStore((state) => state.selectDoc)
  const toggleFolder = useDocsStore((state) => state.toggleFolder)

  const paddingInlineStart = BASE_PADDING_PX + level * INDENT_PX

  if (node.type === 'folder') {
    const isExpanded = Boolean(expanded.get(node.path))
    return (
      <li className="tree-node">
        <button
          type="button"
          className="tree-row tree-folder"
          onClick={() => toggleFolder(node.path)}
          aria-expanded={isExpanded}
          aria-label={`${node.name} folder`}
          style={{ paddingInlineStart }}
        >
          <span className="tree-caret" aria-hidden="true">
            {isExpanded ? '-' : '+'}
          </span>
          <span className="tree-label">{node.name}</span>
        </button>
        {isExpanded ? (
          <ul className="tree-children">
            {node.children.map((child) => (
              <TreeNode key={child.path} node={child} level={level + 1} />
            ))}
          </ul>
        ) : null}
      </li>
    )
  }

  const isSelected = selectedPath === node.path

  return (
    <li className="tree-node">
      <button
        type="button"
        className={`tree-row tree-file${isSelected ? ' is-selected' : ''}`}
        onClick={() => selectDoc(node.path)}
        aria-current={isSelected ? 'page' : undefined}
        style={{ paddingInlineStart }}
      >
        <span className="tree-icon" aria-hidden="true">
          *
        </span>
        <span className="tree-label">{node.name}</span>
      </button>
    </li>
  )
}

export default TreeNode
