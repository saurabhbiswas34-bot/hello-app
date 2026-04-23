export interface UserAddress {
  city: string
  state: string
}

export interface UserCompany {
  name: string
  title: string
}

export interface User {
  id: number
  firstName: string
  lastName: string
  email: string
  phone: string
  image: string
  company: UserCompany
  address: UserAddress
}
