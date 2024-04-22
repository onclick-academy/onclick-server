import { GENDER, NOTIFICATION_TYPE, ROLE } from '@prisma/client'

declare global {
    interface UserDtoI {
        id: string
        firstName: string
        lastName: string
        username: string
        email: string
        bio: string
        password: string
        phoneNum: string
        profilePic?: string
        birthDate: Date
        gender?: GENDER
        role?: ROLE
        isEmailConfirm: boolean
        isDeleted?: boolean
        isRememberMe?: boolean
    }

    interface UserUpdateI {
        id: string
        firstName?: string
        lastName?: string
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

    interface SectionDtoI {
        id?: string | undefined
        courseId: string
        title: string
        isDeleted: boolean
        deletedAt: Date
    }

    interface SectionUpdateDtoI {
        id?: string
        courseId?: string
        content?: string
        isDeleted?: boolean
        deletedAt?: Date
        fullduration?: string
    }

    interface LectureDtoI {
        id?: string
        sectionId: string
        order: number
        title: string
        description: string
        videoUrl: string
        duration: string
        isDeleted: boolean
    }

    interface LectureUpdateI {
        id?: string | undefined
        sectionId?: string
        order?: number
        title?: string
        description?: string
        videoUrl?: string
        duration?: string
        isDeleted?: boolean
        deletedAt?: Date
    }

    interface lectureMaterialI {
        id: string
        title: string
        description: string
        isDeleted: boolean
        deletedAt: Date
        lectureContentId: string
    }

    interface SuspendStateDtoI {
        id: string
        userId: string
        adminId: string
        isValid: boolean
        reason: string
        period: Date
    }

    interface SuspendStateUpdateI {
        id?: string
        userId: string
        adminId: string
        isValid?: boolean
        reason?: string
        period?: Date
    }

    interface BlockStateI {
        id?: string | undefined
        userId: string
        adminId: string
        state: boolean
        reason: string
        period: Date
        user: UserI // this is a relation
    }

    interface CourseDtoI {
        id?: string | undefined
        deletedAt?: Date
        topics: string[]
        subCategories: string[]
        createdBy: string
        adminId: string
        categoryId: string
        title: string
        description: string
        price: number
        rate?: number
        discount?: number
        skillsGained: string[]
        duration?: string
        photo: string
        certificate?: string
        introVideo?: string
        isAvailable: boolean
        isDeleted: boolean
        isApproved?: boolean
        createdBy: string
    }

    interface CourseUpdateI {
        id: string
        createdBy?: string
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
        isApproved?: boolean
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

    interface ContactUsDtoI {
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

    interface RatingDtoI {
        id?: string
        targetType: 'COURSE' | 'INSTRUCTOR'
        targetId: string
        userId: string
        rate: number
        comment?: string
        courseId?: string
        instructorId?: string
    }

    interface RatingUpdateDtoI {
        id: string
        targetType?: 'COURSE' | 'INSTRUCTOR'
        targetId: string
        rate: number
        comment?: string
        courseId?: string
        instructorId?: string
        isDeleted?: boolean
    }

    interface InstructorDtoI {
        id: string
        instructorId: string
        nationalId: string
        avgRate: number
        CvLink: string
    }

    interface NotificationDtoI {
        id?: string
        recipientId: string
        title: string
        message?: string
        isRead: boolean
        type: NOTIFICATION_TYPE
        additionalInfo?: any
        link: string
    }

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

    interface CourseEnrollmentDtoI {
        id?: string
        userId: string
        courseId: string
        progress?: JSON | null
    }
}

export {}
