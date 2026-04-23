import { fetchMockFaqs } from './mockFaqs'

describe('fetchMockFaqs', () => {
  it('returns FAQ data array', async () => {
    const data = await fetchMockFaqs()
    expect(data.length).toBeGreaterThan(0)
    expect(data[0]).toHaveProperty('id')
    expect(data[0]).toHaveProperty('title')
    expect(data[0]).toHaveProperty('content')
  })
})
