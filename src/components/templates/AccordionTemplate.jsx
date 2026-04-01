import SectionTitle from '../atoms/SectionTitle'
import AccordionList from '../organisms/AccordionList'
import useAccordionData from '../../hooks/useAccordionData'

function AccordionTemplate() {
  const { items, isLoading, error } = useAccordionData()

  return (
    <main className="accordion-page">
      <SectionTitle>FAQ Accordion</SectionTitle>
      {isLoading ? <p className="status-text">Loading mock data...</p> : null}
      {error ? <p className="status-text">Failed to load data.</p> : null}
      {!isLoading && !error ? <AccordionList items={items} /> : null}
    </main>
  )
}

export default AccordionTemplate
