import useSWR from 'swr'
import type { AccordionEntry } from '../../../types/accordion'
import type { User } from '../types/user'
import { API_ENDPOINTS } from '../../../config/api'

interface UsersResponse {
  users: User[]
}

interface UsersDataResult {
  items: AccordionEntry[]
  isLoading: boolean
  error: unknown
}

const fetchUsers = async (): Promise<User[]> => {
  const response = await fetch(API_ENDPOINTS.users)
  if (!response.ok) {
    throw new Error('Failed to fetch users')
  }

  const payload = (await response.json()) as UsersResponse
  return payload.users ?? []
}

const toAccordionItem = (user: User): AccordionEntry => ({
  id: `user-${user.id}`,
  title: `${user.firstName} ${user.lastName}`,
  content: [
    `Role: ${user.company.title} at ${user.company.name}`,
    `Email: ${user.email}`,
    `Phone: ${user.phone}`,
    `Location: ${user.address.city}, ${user.address.state}`,
  ].join('\n'),
})

const useUsersData = (): UsersDataResult => {
  const { data, error, isLoading } = useSWR<User[]>(
    API_ENDPOINTS.users,
    fetchUsers
  )

  return {
    items: (data ?? []).map(toAccordionItem),
    isLoading,
    error,
  }
}

export default useUsersData
