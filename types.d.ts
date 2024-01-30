declare global {
  interface UserDtoI {
    id: string
    fullName: string
    username: string
    email: string
    bio: string
    password: string
    phoneNum: string
    profilePic?: string
    birthDate: Date
    gender: string
    role: string
    isEmailConfirm: boolean
  }

  interface AdminI {
    id: string
    firstName: string
    lastName: string
    email: string
    password: string
    profilePic: string
    isDeleted: boolean
    deletedAt: Date
  }

  interface LectureI {
    id: string
    courseId: string
    title: string
    description: string
    videoUrl: string
    duration: string
    isDeleted: boolean
    deletedAt: Date
  }

  interface LectureContentI {
    id: string
    lectureId: string
    materialId: string
    order: number
    content: string
    isDeleted: boolean
    deletedAt: Date
  }

  interface lectureMaterialI {
    id: string
    title: string
    description: string
    isDeleted: boolean
    deletedAt: Date
  }

  interface SusspendStateI {
    id: string
    UserDtoId: string
    adminId: string
    isValid: boolean
    reason: string
    period: Date
  }

  interface BlockStateI {
    id: string
    UserDtoId: string
    adminId: string
    state: boolean
    reason: string
    period: Date
  }
}

export {}
