import type { FaqItem } from '../types/faq'

const mockFaqs: FaqItem[] = [
  {
    id: 'item-1',
    title: 'What is Atomic Design?',
    content:
      'Atomic Design is a component methodology that organizes UI from small reusable atoms up to templates and pages.',
  },
  {
    id: 'item-2',
    title: 'Why use Zustand for this accordion?',
    content:
      'Zustand gives a simple global store for open/close state, so any component can control or read the active accordion item.',
  },
  {
    id: 'item-3',
    title: 'What role does SWR play?',
    content:
      'SWR handles data fetching, caching, and revalidation so the accordion can consume mock API data like real backend data.',
  },
  {
    id: 'item-4',
    title: 'Can this work with real API data later?',
    content:
      'Yes. You can replace the mock fetcher with a real endpoint while keeping the same SWR hook and component structure.',
  },
]

export const fetchMockFaqs = async (): Promise<FaqItem[]> => {
  await new Promise((resolve) => setTimeout(resolve, 350))
  return mockFaqs
}
