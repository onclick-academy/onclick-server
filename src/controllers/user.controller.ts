import { UserDao } from '../models/dao/user.dao'
import { UserDto } from '../models/dto/user.dto'
import { registerValidation } from '../middlewares/validation/auth/register.auth.validation'
import { createToken } from '../utilities/token'
import { Request, Response } from 'express'

export class UserController {
  static register = async (req: Request, res: Response) => {
    const userDto = new UserDto(req.body)

    const validationResult = await registerValidation.createUser(userDto)
    if (validationResult.error) {
      if (validationResult.error.details && validationResult.error.details.length > 0) {
        console.error(validationResult.error.details[0].message)
        return res.status(400).json({ error: validationResult.error.details[0].message })
      }
      return res.status(400).json({ error: 'Error when creating user' })
    }
    if (req.file) {
      userDto.profilePic = req.file.filename
    }

    const userDao = new UserDao()
    try {
      const newUser = await userDao.createUser(userDto)
      const newToken = createToken(newUser)

      return res.status(200).json({
        data: newUser,
        token: newToken,
        status: 'success'
      })
    } catch (error) {
      if (error.message.includes('Email is already in use') || error.message.includes('Username is not available')) {
        return res.status(400).json({ error: error.message, status: 'failed' })
      }
      return res.status(500).json({ error: error.message, status: 'failed' })
    }
  }
}
