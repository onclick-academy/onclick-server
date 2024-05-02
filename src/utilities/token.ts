import jwt from 'jsonwebtoken'
import { expiredPeriod } from '../index'

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
    secret: string = process.env.JWT_SECRET_KEY as string,
    obj: TokenOptions
) => {
    const { id, username, email, role } = userDto
    return jwt.sign({ id, username, email, role }, secret, { expiresIn: obj.expiresIn || expiredPeriod.accessToken })
}
