import useSWR from 'swr'
import { fetchMockFaqs } from '../data/mockFaqs'
import type { FaqItem } from '../types/faq'

interface AccordionDataResult {
  items: FaqItem[]
  isLoading: boolean
  error: unknown
}

const useAccordionData = (): AccordionDataResult => {
  const { data, error, isLoading } = useSWR<FaqItem[]>(
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
