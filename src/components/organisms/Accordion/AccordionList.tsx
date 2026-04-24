import AccordionItem from '../../molecules/AccordionItem/AccordionItem'
import type { AccordionEntry } from '../../../types/accordion'
import { AccordionStoreProvider } from './store/AccordionStoreProvider'
import './AccordionList.css'

interface AccordionListProps {
  items: AccordionEntry[]
}

function AccordionList({ items }: AccordionListProps) {
  return (
    <AccordionStoreProvider>
      <section className="accordion" aria-label="FAQ accordion">
        {items.map((item) => (
          <AccordionItem key={item.id} item={item} />
        ))}
      </section>
    </AccordionStoreProvider>
  )
}

export default AccordionList
