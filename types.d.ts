declare global {
  interface UserInterface {
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
    isEmailConfirm: boolean
    students?: any
    instructors?: any
    suspendStates?: any
    blockStates?: any
    wishList?: any
    notifications?: any
    ratings?: any
  }

  interface AdminInterface {
    id: string
    firstName: string
    lastName: string
    email: string
    password: string
    profilePic: string
    isDeleted: boolean
    deletedAt: Date
  }

  interface LectureInterface {
    id: string
    courseId: string
    title: string
    description: string
    videoUrl: string
    duration: string
    isDeleted: boolean
    deletedAt: Date
  }

  interface LectureContentInterface {
    id: string
    lectureId: string
    materialId: string
    order: number
    content: string
    isDeleted: boolean
    deletedAt: Date
  }

  interface lectureMaterialInterface {
    id: string
    title: string
    description: string
    isDeleted: boolean
    deletedAt: Date
  }

  interface SusspendStateInterface {
    id: string
    userId: string
    adminId: string
    isValid: boolean
    reason: string
    period: Date
  }

  interface BlockStateInterface {
    id: string
    userId: string
    adminId: string
    state: boolean
    reason: string
    period: Date
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
