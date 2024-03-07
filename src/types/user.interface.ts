import { GENDER, ROLE, EDUCATION_LEVEL } from '@prisma/client'
import { Request } from 'express'

export interface UserTokenI {
    id: string
    username: string
    email: string
    role: string
    refreshToken?: string
    accessToken?: string
    password?: string
    isAvailable?: boolean
    isDeleted?: boolean
}

export interface AdminTokenI {
    id: string
    email: string
    role: string
    refreshToken?: string
    accessToken?: string
    password?: string
    isAvailable?: boolean
    isDeleted?: boolean
}

export interface UserDtoI {
    id: string
    fullName: string
    username: string
    email: string
    bio: string
    password: string
    phoneNum: string
    educationLevel: EDUCATION_LEVEL
    profilePic?: string
    birthDate: Date
    gender?: GENDER
    role: ROLE
    isEmailConfirm: boolean
    isDeleted?: boolean
    isRememberMe?: boolean
}

export interface UserUpdateI {
    id: string
    fullName?: string
    username?: string
    email?: string
    bio?: string
    password?: string
    phoneNum?: string
    educationLevel?: EDUCATION_LEVEL
    profilePic?: string
    birthDate?: Date
    gender?: GENDER
    role?: ROLE
    isEmailConfirm?: boolean
    isDeleted?: boolean
}

export interface loginDtoI {
    email?: string
    password?: string
    username?: string
    role?: string
    id?: string
    isAvailable?: boolean
    isRememberMe?: boolean
}

export interface UserRequest extends Request {
    user: UserTokenI
    file?: any
}

export interface User {}
