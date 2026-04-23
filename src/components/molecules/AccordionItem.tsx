import useAccordionStore from '../organisms/Accordion/store/useAccordionStore'
import type { AccordionEntry } from '../../types/accordion'
import './AccordionItem.css'

interface AccordionItemProps {
  item: AccordionEntry
}

function AccordionItem({ item }: AccordionItemProps) {
  const openItemId = useAccordionStore((state) => state.openItemId)
  const toggleItem = useAccordionStore((state) => state.toggleItem)
  const isOpen = openItemId === item.id

  return (
    <article
      className={`accordion__item${isOpen ? ' accordion__item--open' : ''}`}
    >
      <button
        type="button"
        className="accordion__trigger"
        onClick={() => toggleItem(item.id)}
      >
        <span>{item.title}</span>
        <span className="accordion__icon" aria-hidden="true">
          {isOpen ? '-' : '+'}
        </span>
      </button>
      {isOpen ? <p className="accordion__content">{item.content}</p> : null}
    </article>
  )
}

export default AccordionItem
