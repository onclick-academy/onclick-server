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

  interface CourseInterface {
    adminId: string
    categoryId: string
    subCategoryId: string
    title: string
    description: string
    price: number
    rate?: number
    discount?: number
    isAvailable: boolean
    skillsGained: string[]
    duration: string
    photoUrl: string
    isDeleted: boolean
    deletedAt?: Date
    certifiacteUrl: string
    introVideoUrl?: string
  }
  interface TopicInterface {
    title: string
    isDeleted: boolean
    deletedAt: Date
  }
  interface ContactUsInterface {
    id: string
    name: string
    email: string
    message: string
    phone?: string | null
    isRead: boolean
  }
  interface EventsInterface {
    adminId: string
    title: string
    description: string
    startDate: Date
    endDate: Date
    isDeleted: boolean
    deletedAt?: Date
    isAvailable: boolean
    cover: string
    images?: string[]
  }
  interface AppSettingsInterface {
    mainEmail: string
    contactEmail: string
    contactPhone: string
    aboutUs: string
    terms: string
    privacy: string
    logo: string
    favicon: string
    coverSlides: string[]
    socialLinks: {
      facebook: string
      twitter: string
      instagram: string
      linkedin: string
    }
  }

  interface RatingInterface {
    targetType: 'COURSE' | 'INSTRUCTOR'
    targetId: string
    rate: number
    comment?: string
    userId: string
    courseId?: string
  }
}

export {}
