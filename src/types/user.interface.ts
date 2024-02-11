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

export interface GlobalUserI {
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
export interface UserDtoI {
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

export interface UserUpdateI {
  id: string
  fullName?: string
  username?: string
  email?: string
  bio?: string
  password?: string
  phoneNum?: string
  profilePic?: string
  birthDate?: Date
  gender?: string
  role?: string
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
  cookies?: any
}

export interface User {}
