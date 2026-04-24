import SectionTitle from '../../components/atoms/SectionTitle/SectionTitle'
import AccordionList from '../../components/organisms/Accordion/AccordionList'
import useUsersData from './hooks/useUsersData'
import './Users.css'

function Users() {
  const { items, isLoading, error } = useUsersData()

  return (
    <div className="users-page">
      <SectionTitle>Users</SectionTitle>
      <p className="users-page__description">
        User records are loaded from DummyJSON and rendered as an accordion
        list.
      </p>
      {isLoading ? (
        <p className="users-page__status">Loading users...</p>
      ) : null}
      {error ? (
        <p className="users-page__status">Failed to load users.</p>
      ) : null}
      {!isLoading && !error ? (
        <section className="users-page__accordion" aria-label="Users accordion">
          <AccordionList items={items} />
        </section>
      ) : null}
    </div>
  )
}

export default Users
