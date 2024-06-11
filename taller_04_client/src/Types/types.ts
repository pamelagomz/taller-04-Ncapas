type User = {
  id?: string
  fullName: string
  email?: string
  roles: string[]
  homeId?: string
  dui: string
  assignedTerminal?: string | null
}

type Home = {
  id?: string
  homeNumber?: number
  address?: string
  admin?: User | null
  users?: User[]
  membersNumber?: number
}

type Visitor = {
  id: string
  date: string
  visitorName: string
  homeNumber: string
}

type Entries = {
  id: string
  date: string
  entryType: string
  name: string | null
  homeNumber: string | null
  comment: string | null
}
