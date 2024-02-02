import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import { HttpError } from 'http-errors'

export const createToken = (userDto: loginDtoI, secret: string = process.env.JWT_SECRET_KEY, obj: any) => {
  const { id, username, email, role } = userDto
  if (typeof secret === 'string') {
    return jwt.sign({ id, username, email, role }, secret, { expiresIn: obj.expiresIn })
  } else throw new Error('JWT_SECRET_KEY is not set in environment variables')
}

// TODO add authentication for Admin and instructor
// TODO add refresh token
