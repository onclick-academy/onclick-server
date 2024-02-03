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

export interface UserRequest extends Request {
  user: UserTokenI
  cookies?: any
}

export interface User {}
