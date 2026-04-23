import useSWR from 'swr'
import type { AccordionEntry } from '../../../../types/accordion'

interface AccordionDataResult {
  items: AccordionEntry[]
  isLoading: boolean
  error: unknown
}

const MOCK_FAQS: AccordionEntry[] = [
  {
    id: 'item-1',
    title: 'What is Atomic Design?',
    content:
      'Atomic Design is a component methodology that organizes UI from small reusable atoms up to templates and pages.',
  },
  {
    id: 'item-2',
    title: 'Why use useReducer for this accordion?',
    content:
      'A local useReducer with context keeps open/close state explicit, testable, and colocated with the accordion UI behavior.',
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

const fetchMockFaqs = async (): Promise<AccordionEntry[]> => {
  await new Promise((resolve) => setTimeout(resolve, 350))
  return MOCK_FAQS
}

const useAccordionData = (): AccordionDataResult => {
  const { data, error, isLoading } = useSWR<AccordionEntry[]>(
    'mock-faqs',
    fetchMockFaqs
  )

  return {
    items: data ?? [],
    isLoading,
    error,
  }
}

export default useAccordionData
