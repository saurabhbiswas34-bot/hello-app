import AccordionItem from '../molecules/AccordionItem'

function AccordionList({ items }) {
  return (
    <section className="accordion-list" aria-label="FAQ accordion">
      {items.map((item) => (
        <AccordionItem key={item.id} item={item} />
      ))}
    </section>
  )
}

export default AccordionList
