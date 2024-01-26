declare global {
  interface User {
    id: string
    createdAt: Date
    updatedAt: Date

    firstName: string
    lastName: string
    email: string
    password: string
  }
}

export {}
