import useSWR from 'swr'
import { fetchMockFaqs } from '../data/mockFaqs'

const useAccordionData = () => {
  const { data, error, isLoading } = useSWR('mock-faqs', fetchMockFaqs)

  return {
    items: data ?? [],
    isLoading,
    error,
  }
}

export default useAccordionData
