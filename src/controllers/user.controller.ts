import { UserRequest } from '../types/user.interface'
import { UserDao } from '../models/dao/user.dao'
import { UserDto } from '../models/dto/user.dto'
import { Request, Response } from 'express'
import { AuthController } from './auth.controller'
import { registerValidation } from '@middlewares/validation/auth/register.auth.validation'
import { UserIdValidation } from '@utilities/IdValidation/users.id'

export class UserController {
  static getAllUsers = async (req: UserRequest, res: Response) => {
    const userDao = new UserDao()
    const users = await userDao.getAllUsers()

    if (!users) return res.status(404).json({ error: 'No users found' })

    return res.status(200).json({
      message: 'Users retrieved successfuly',
      data: users,
      status: 'success',
      user: req.user
    })
  }

  static searchUser = async (req: Request, res: Response) => {
    const search = req.query.query
    const userDao = new UserDao()

    try {
      const users = await userDao.searchUser(search as string)

      if (!users) return res.status(404).json({ error: 'No users found' })

      return res.status(200).json({ message: 'Users retrieved successfuly', data: users, status: 'success' })
    } catch (error: any) {
      return res.status(400).json({ error: error.message, status: 'failed' })
    }
  }

  static getUserById = async (req: Request, res: Response) => {
    const userDao = new UserDao()
    const user = await userDao.getUserById(req.params.userId)

    if (!user) return res.status(404).json({ error: 'User not found' })

    return res.status(200).json({ message: 'User retrieved successfuly', data: user, status: 'success' })
  }

  static updateUser = async (req: Request, res: Response) => {
    const userDao = new UserDao()
    const userDto = new UserDto(req.body)
    userDto.id = req.params.userId

    try {
      await UserIdValidation(userDto.id)

      const {error} = await registerValidation.updateUser(userDto)
      if (error) return res.status(400).json({ error: error.details[0].message })

      const updatedUser = await userDao.updateUser(userDto)

      if (req.body.email) {
        await AuthController.sendConfirmationEmail(req, res)
      }

      if (!updatedUser) return res.status(404).json({ error: 'User not found' })

      return res.status(200).json({ message: 'User updated successfuly', data: updatedUser, status: 'success' })
    } catch (error: any) {
      return res.status(400).json({ error: error.message })
    }
  }

  static softDeleteUser = async (req: Request, res: Response) => {
    const userDao = new UserDao()
    const userId = req.params.userId

    console.log(userId)
    try {

      await UserIdValidation(userId)

      const deletedUser = await userDao.softDeleteUser(userId)

      if (!deletedUser) return res.status(404).json({ error: 'User not found' })

      return res.status(200).json({ message: 'User deleted successfuly', data: deletedUser, status: 'success' })
    } catch (error: any) {
      return res.status(400).json({ error: error.message })
    }
  }

  static hardDeleteUser = async (req: Request, res: Response) => {
    const userDao = new UserDao()
    const userId = req.params.userId

    try {

      await UserIdValidation(userId)

      const deletedUser = await userDao.hardDeleteUser(userId)

      if (!deletedUser) return res.status(404).json({ error: 'User not found' })

      return res.status(200).json({ message: 'User deleted successfuly', data: deletedUser, status: 'success' })
    } catch (error: any) {
      return res.status(400).json({ error: error.message })
    }
  }

  static deactivateUser = async (req: Request, res: Response) => {
    const userDao = new UserDao()
    const userId = req.params.userId

    try {

      await UserIdValidation(userId)

      const deactivatedUser = await userDao.deactivateUser(userId)

      if (!deactivatedUser) return res.status(404).json({ error: 'User not found' })

      return res.status(200).json({ message: 'User deactivated successfuly', data: deactivatedUser, status: 'success' })
    } catch (error: any) {
      return res.status(400).json({ error: error.message })
    }
  }
}
