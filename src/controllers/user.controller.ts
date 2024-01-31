import { UserDao } from '../models/dao/user.dao'
import { RegisterDto as UserDto }  from '../models/dto/register.dto'
import { registerValidation } from '../middlewares/validation/auth/register.auth.validation'
import { createToken } from '../utilities/token'
import { Request, Response } from 'express'
import { LoginValidation } from '../middlewares/validation/auth/login.auth.validation'
import { AuthDao } from '../models/dao/auth.dao'
import { LoginDto } from '../models/dto/login.dto'

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
      userDto.profilePic = req.file.path
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

  static login = async (req: Request, res: Response) => {
    const loginDto = new LoginDto(req.body)

    const LoginValidationResult = await LoginValidation.validateLoginInput(loginDto)
    if (LoginValidationResult.error) {
      if (LoginValidationResult.error.details && LoginValidationResult.error.details.length > 0) {
        console.error(LoginValidationResult.error.details[0].message)
        return res.status(400).json({ error: LoginValidationResult.error.details[0].message })
      }
      return res.status(400).json({ error: 'Error when validating the login' })
    }

    const authDao = new AuthDao()
    try {
      const user = await authDao.login(loginDto)
      const newToken = createToken(loginDto)
      return res.status(200).json({
        data: user,
        token: newToken,
        status: 'success'
      })
    } catch (error) {
      return res.status(500).json({ error: error.message, status: 'failed to login' })
    }
  }
}
