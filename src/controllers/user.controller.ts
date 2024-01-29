import { UserDao } from '../models/dao/user.dao'
import { UserDto } from '../models/dto/user.dto'
import { registerValidation } from '../middlewares/validation/auth/register.auth.validation'
import { createToken } from '../utilities/token'

export class UserController {
  static register = async (req: any, res: any) => {
    const userDto = new UserDto(req.body)

    const error = await registerValidation.createUser(userDto)
    if (error) return res.status(400).json({ error: error.details[0].message })
    if (req.file) {
      userDto.profilePic = req.file.filename
    }

    const userDao = new UserDao()
    try {
      const newToken = createToken(userDto)

      const newUser = await userDao.createUser(userDto)

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
