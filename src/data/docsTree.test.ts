import {
  docsContentByPath,
  docsTree,
  getFirstDocPath,
  getInitialExpanded,
} from './docsTree'

describe('docsTree data helpers', () => {
  it('builds docs tree with children', () => {
    expect(docsTree.type).toBe('folder')
    expect(docsTree.children.length).toBeGreaterThan(0)
  })

  it('returns first markdown path', () => {
    const first = getFirstDocPath()
    expect(first).toMatch(/^docs\/.+\.md$/)
  })

  it('returns expanded map with docs root', () => {
    const expanded = getInitialExpanded()
    expect(expanded.get('docs')).toBe(true)
  })

  it('maps markdown content by path', () => {
    const first = getFirstDocPath()
    expect(first).not.toBeNull()
    if (first) {
      expect(typeof docsContentByPath.get(first)).toBe('string')
    }
  })
})
