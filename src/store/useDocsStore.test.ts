import useDocsStore from './useDocsStore'

describe('useDocsStore', () => {
  beforeEach(() => {
    useDocsStore.setState({
      selectedPath: null,
      expanded: new Map([
        ['docs', true],
        ['docs/architecture', true],
      ]),
    })
  })

  it('selects a doc path', () => {
    useDocsStore.getState().selectDoc('docs/architecture/ARCHITECTURE.md')
    expect(useDocsStore.getState().selectedPath).toBe(
      'docs/architecture/ARCHITECTURE.md'
    )
  })

  it('toggles folder expansion state', () => {
    useDocsStore.getState().toggleFolder('docs/architecture')
    expect(useDocsStore.getState().expanded.get('docs/architecture')).toBe(
      false
    )

    useDocsStore.getState().toggleFolder('docs/architecture')
    expect(useDocsStore.getState().expanded.get('docs/architecture')).toBe(true)
  })
})
