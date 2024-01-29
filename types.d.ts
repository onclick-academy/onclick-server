import { Request } from 'express'

declare global {
  interface UserInterface extends Request {
    id: string
    fullName: string
    username: string
    email: string
    bio: string
    password: string
    phoneNum: string
    profilePic: string
    birthDate: Date
    gender: string
    role: string
    isEmailConfirmed: boolean
  }

  interface AdminInterface extends Request {
    id: string
    firstName: string
    lastName: string
    email: string
    password: string
    profilePic: string
    isDeleted: boolean
    deletedAt: Date
  }
}

export { UserInterface, AdminInterface }
