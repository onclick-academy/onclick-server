import jwt from 'jsonwebtoken'

export const createToken = (useDto: UserInterface) => {
  const { id, username, email, role } = useDto
  const secret = process.env.JWT_SECRET_KEY
  if (typeof secret === 'string') {
    return jwt.sign({ id, username, email, role }, secret, { expiresIn: '90d' })
  } else throw new Error('JWT_SECRET_KEY is not set in environment variables')
}

export const verifyToken = (token: string) => {
  const secret = process.env.JWT_SECRET_KEY
  if (typeof secret === 'string') {
    return jwt.verify(token, secret)
  } else throw new Error('JWT_SECRET_KEY is not set in environment variables')
}
// TODO add authentication for Admin and instructor
// TODO add refresh token
