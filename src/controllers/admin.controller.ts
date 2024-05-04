import { UserDao } from '@models/dao/user.dao'
import { Request, Response } from 'express'
import { UserDto } from '@models/dto/user.dto'
import { RegisterValidation } from '@middlewares/validation/auth/register.auth.validation'

export class AdminController {
    // TODO send email to admin to confirm his email
    static createAdmin = async (req: any, res: Response) => {
        const adminDto = new UserDto(req.body)
        const userDao = new UserDao()

        try {
            const { error } = await RegisterValidation.updateUser(adminDto)
            if (error) return res.status(400).json({ error: error.details[0].message })

            console.log('===========heeeeeeey=========')
            const admin = await userDao.updateUser(adminDto)

            return res.status(200).json({ message: 'Admin created successfully', admin, status: 'success' })
        } catch (error: any) {
            console.log(error)
            return res.status(500).json({ error: error.message })
        }
    }

    static getAllAdmins = async (req: Request, res: Response) => {
        const userDao = new UserDao()
        try {
            const admins = await userDao.getAllAdmins()
            return res.status(200).json({ message: 'Admins Fetched Successuflly', admins, status: 'success' })
        } catch (error: any) {
            return res.status(500).json({ error: error.message })
        }
    }

    static deleteAdmin = async (req: Request, res: Response) => {
        const userDao = new UserDao()
        const userDto = new UserDto(req.body)
        try {
            const { error } = await RegisterValidation.updateUser(userDto)
            if (error) return res.status(400).json({ error: error.details[0].message })

            const admin = await userDao.updateUser(userDto)
            return res.status(200).json({ message: 'Admin Deleted Successuflly', admin, status: 'success' })
        } catch (error: any) {
            return res.status(500).json({ error: error.message })
        }
    }
}
