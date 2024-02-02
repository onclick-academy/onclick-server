export interface UserTokenI {
  id: string
  username: string
  email: string
  role: string
}

export interface UserRequest extends Request {
  user: UserTokenI
}

export interface User {}
