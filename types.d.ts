import { NOTIFICATION_TYPE } from '@prisma/client'

declare global {
    interface GlobalUserI {
        id: string
        fullName: string
        username: string
        email: string
        bio: string
        phoneNum: string
        profilePic: string
        birthDate: Date
        role: string
    }
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
        isDeleted?: boolean
        isRememberMe?: boolean
    }

    interface UserUpdateI {
        id: string
        fullName?: string
        username?: string
        email?: string
        bio?: string
        password?: string
        phoneNum?: string
        profilePic?: string
        birthDate?: Date
        gender?: GENDER
        role?: ROLE
        isEmailConfirm?: boolean
        isDeleted?: boolean
    }

    interface loginDtoI {
        email?: string
        password?: string
        username?: string
        role?: string
        id?: string
        isAvailable?: boolean
        isRememberMe?: boolean
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

    interface CourseDtoI {
        id?: string | undefined
        deletedAt?: Date
        topicIds: string[]
        instructorId: string
        adminId: string
        categoryId: string
        subCategoryId: string
        title: string
        description: string
        price: number
        rate?: number
        discount?: number
        skillsGained: string[]
        duration: string
        photo: string
        certificate: string
        introVideo?: string
        isAvailable: boolean
        isDeleted: boolean
        isApproved?: boolean
    }

    interface CourseUpdateI {
        id: string
        instructorId?: string
        adminId?: string
        categoryId?: string
        subCategoryId?: string
        title?: string
        description?: string
        price?: number
        rate?: number
        discount?: number
        available?: boolean
        skillsGained?: string[]
        duration?: string
        photo?: string
        isDeleted?: boolean
        deletedAt?: Date
        certificate?: string
        introVideo?: string
    }

    interface TopicDtoI {
        id?: string
        title: string
        isDeleted: boolean
        deletedAt: Date
    }

    interface TopicUpdateI {
        id?: string
        title?: string
        isDeleted?: boolean
        deletedAt?: Date
    }

    interface GlobalTopicI {
        id: string
        createdAt: Date
        updatedAt: Date

        title: string
        isDeleted: boolean
        deletedAt: Date | null
    }

    interface ContactUsInterface {
        id: string
        name: string
        email: string
        message: string
        phone?: string | null
        isRead: boolean
    }
    interface EventDtoI {
        id: string | undefined
        adminId: string
        title: string
        subtitle: string
        description: string
        images?: string[]
        startDate: Date
        endDate: Date
        isDeleted: boolean
        deletedAt?: Date
        isAvailable: boolean
        cover: string
    }

    interface EventUpdateI {
        id: string
        adminId?: string
        title?: string
        subtitle?: string
        description?: string
        images?: string[]
        startDate?: Date
        endDate?: Date
        isDeleted?: boolean
        deletedAt?: Date
        isAvailable?: boolean
        cover?: string
    }
    interface AppSettingsDtoI {
        id?: string
        adminId: string
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

    interface AppSettingsUpdateI {
        id: string | undefined
        adminId?: string
        mainEmail?: string
        contactEmail?: string
        contactPhone?: string
        aboutUs?: string
        terms?: string
        privacy?: string
        logo?: string
        favicon?: string
        coverSlides?: string[]
        socialLinks?: {
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

    interface InstructorDtoI {
        id: string
        instructorId: string
        nationalId: string
        avgRate: number
        CvLink: string
    }
    interface GlobalStudentI {
        id: string
        createdAt: Date
        updatedAt: Date

        userId: string
    }

    interface NotificationDtoI {
        id?: string
        recipientId: string
        title: string
        message?: string
        isRead: boolean
        type: NOTIFICATION_TYPE
        additionalInfo?: any
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
    // interface SubCategoryI {
    //   id: string
    //   categoryId: string
    //   name: string
    //   description: string
    //   isDeleted: boolean
    //   deletedAt: Date
    // }

    interface NewsDtoI {
        id: string
        adminId: string
        title: string
        subtitle: string
        description: string
        images: string[]
        isDeleted: boolean
        deletedAt: Date
        isAvailable: boolean
        cover: string
    }

    interface WishlistDtoI {
        id: string
        userId: string
        courseId: string
        isDeleted: boolean
        deletedAt: Date
    }

    interface WishlistUpdateI {
        id: string
        userId?: string
        courseId?: string
        isDeleted?: boolean
        deletedAt?: Date
    }
}

export {}
