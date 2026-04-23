import DocTree from '../organisms/DocTree'
import DocContent from '../organisms/DocContent'
import { docsContentByPath, docsTree } from '../../data/docsTree'

function DocsExplorerTemplate() {
  return (
    <div className="docs-explorer">
      <aside
        className="docs-explorer-sidebar"
        aria-label="Documentation navigation"
      >
        <h2 className="docs-explorer-heading">Docs</h2>
        <DocTree tree={docsTree} />
      </aside>
      <main className="docs-explorer-main">
        <DocContent docsByPath={docsContentByPath} />
      </main>
    </div>
  )
}

export default DocsExplorerTemplate
