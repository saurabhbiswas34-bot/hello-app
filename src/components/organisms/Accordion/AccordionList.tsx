import AccordionItem from '../../molecules/AccordionItem'
import type { AccordionEntry } from '../../../types/accordion'
import './AccordionList.css'

interface AccordionListProps {
  items: AccordionEntry[]
}

function AccordionList({ items }: AccordionListProps) {
  return (
    <section className="accordion" aria-label="FAQ accordion">
      {items.map((item) => (
        <AccordionItem key={item.id} item={item} />
      ))}
    </section>
  )
}

export default AccordionList
