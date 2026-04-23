import AccordionItem from '../molecules/AccordionItem'
import type { FaqItem } from '../../types/faq'

interface AccordionListProps {
  items: FaqItem[]
}

function AccordionList({ items }: AccordionListProps) {
  return (
    <section className="accordion-list" aria-label="FAQ accordion">
      {items.map((item) => (
        <AccordionItem key={item.id} item={item} />
      ))}
    </section>
  )
}

export default AccordionList
