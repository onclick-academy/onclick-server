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

  interface LectureInterface extends Request {
    id: string
    courseId: string
    title: string
    description: string
    videoUrl: string
    duration: string
    isDeleted: boolean
    deletedAt: Date
  }

  interface LectureContentInterface extends Request {
    id: string
    lectureId: string
    materialId: string
    order: number
    content: string
    isDeleted: boolean
    deletedAt: Date
  }

  interface lectureMaterialInterface extends Request {
    id: string
    title: string
    description: string
    isDeleted: boolean
    deletedAt: Date
  }

  interface SusspendStateInterface extends Request {
    id: string
    userId: string
    adminId: string
    isValid: boolean
    reason: string
    period: Date
  }

  interface BlockStateInterface extends Request {
    id: string
    userId: string
    adminId: string
    state: boolean
    reason: string
    period: Date
  }

  interface ContactUsInterface {
    id: string
    name: string
    email: string
    message: string
    phone?: string | null
    isRead: boolean
  }
}

export {
  UserInterface,
  AdminInterface,
  LectureInterface,
  LectureContentInterface,
  lectureMaterialInterface,
  SusspendStateInterface,
  BlockStateInterface
}
