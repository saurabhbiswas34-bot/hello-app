import useAccordionStore from '../../store/useAccordionStore'

function AccordionItem({ item }) {
  const openItemId = useAccordionStore((state) => state.openItemId)
  const toggleItem = useAccordionStore((state) => state.toggleItem)
  const isOpen = openItemId === item.id

  return (
    <article className={`accordion-item ${isOpen ? 'is-open' : ''}`}>
      <button
        type="button"
        className="accordion-trigger"
        onClick={() => toggleItem(item.id)}
      >
        <span>{item.title}</span>
        <span className="accordion-icon" aria-hidden="true">
          {isOpen ? '-' : '+'}
        </span>
      </button>
      {isOpen ? <p className="accordion-content">{item.content}</p> : null}
    </article>
  )
}

export default AccordionItem
