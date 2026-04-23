import ReactMarkdown from 'react-markdown'
import useDocsStore from '../../store/useDocsStore'

interface DocContentProps {
  docsByPath: Map<string, string>
}

function DocContent({ docsByPath }: DocContentProps) {
  const selectedPath = useDocsStore((state) => state.selectedPath)

  if (!selectedPath) {
    return (
      <section className="doc-content doc-content-empty" aria-live="polite">
        <p>Select a document from the tree to view its content.</p>
      </section>
    )
  }

  const content = docsByPath.get(selectedPath)

  if (typeof content !== 'string') {
    return (
      <section className="doc-content doc-content-empty" aria-live="polite">
        <p>Content not found for "{selectedPath}".</p>
      </section>
    )
  }

  return (
    <section
      className="doc-content"
      aria-label={`Content of ${selectedPath}`}
      key={selectedPath}
    >
      <header className="doc-content-header">
        <p className="doc-content-path">{selectedPath}</p>
      </header>
      <article className="markdown-body">
        <ReactMarkdown>{content}</ReactMarkdown>
      </article>
    </section>
  )
}

export default DocContent
