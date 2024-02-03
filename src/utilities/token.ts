import jwt from 'jsonwebtoken'

interface TokenOptions {
  expiresIn?: string
}

interface UserDto {
  id?: string
  username?: string
  email?: string
  role?: string
}

export const createToken = (
  userDto: Partial<UserDto>,
  secret: string = process.env.JWT_SECRET_KEY,
  obj: TokenOptions
) => {
  const { id, username, email, role } = userDto
  return jwt.sign({ id, username, email, role }, secret, { expiresIn: obj.expiresIn || '5m' })
}
