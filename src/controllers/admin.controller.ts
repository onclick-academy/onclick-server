import { AdminDao } from '../models/dao/admin.dao'
import { AdminDto } from '../models/dto/admin.dto'
import { AdminValidation } from '../middlewares/validation/users/admin.validation'

import { Request, Response } from 'express'
import { AuthDao } from '../models/dao/auth.dao'
import { AuthController } from './auth.controller'

export class AdminController {
  static createAdmin = async (req: Request, res: Response) => {

    const adminDto = new AdminDto(req.body)

    const authDao = new AuthDao()
    const adminDao = new AdminDao()
    console.log('req.body', adminDto)

    try {
      try {
        const isExist = await authDao.getUserByEmail({ email: adminDto.email })

        console.log('isExist', isExist)
        if (isExist) return res.status(400).json({ error: 'Email is in use FOR USER.' })
      } catch (e) {
        const { error } = await AdminValidation.createAdmin(adminDto)

        if (error) return res.status(400).json({ error: error.details[0].message })

        const admin = await adminDao.createAdmin(adminDto)
        // sendEmail(req, res, admin, 'Confirm')
        // TODO send email to admin

        await AuthController.sendConfirmationEmail(req, res)

        res.status(201).json({ message: 'Admin created successfully', data: admin, state: 'success' })
      }
    } catch (error: any) {
      res.status(500).json({ error: error.message })
    }
  }

  static getAllAdmins = async (req: Request, res: Response) => {
    const adminDao = new AdminDao()

    try {
      const admins = await adminDao.getAllAdmins()

      res.status(200).json({ message: 'Admins Retrieved Successfully', data: admins, state: 'success' })
    } catch (error: any) {
      res.status(500).json({ error: error.message })
    }
  }

  static getAdminById = async (req: Request, res: Response) => {
    const adminDao = new AdminDao()

    const { adminId } = req.params

    try {
      const admin = await adminDao.getAdminById(adminId)

      res.status(200).json({ message: 'Admin Retrieved Successfully', data: admin, state: 'success' })
    } catch (error: any) {
      res.status(500).json({ error: error.message })
    }
  }

  static updateAdmin = async (req: Request, res: Response) => {
    const adminDto = new AdminDto(req.body)
    adminDto.id = req.params.adminId

    const adminDao = new AdminDao()

    try {
      const { error } = await AdminValidation.updateAdmin(adminDto)

      if (error) return res.status(400).json({ error: error.details[0].message })

      const admin = await adminDao.updateAdmin(adminDto)

      res.status(200).json({ message: 'Admin Updated Successfully', data: admin, state: 'success' })
    } catch (error: any) {
      res.status(500).json({ error: error.message })
    }
  }

  static softDeleteAdmin = async (req: Request, res: Response) => {
    const adminDao = new AdminDao()

    const { adminId } = req.params

    try {
      const admin = await adminDao.softDeleteAdmin(adminId)

      res.status(200).json({ message: 'Admin Deleted (softly) Successfully', data: admin, state: 'success' })
    } catch (error: any) {
      res.status(500).json({ error: error.message })
    }
  }

  static hardDeleteAdmin = async (req: Request, res: Response) => {
    const adminDao = new AdminDao()

    const { adminId } = req.params

    try {
      const admin = await adminDao.hardDeleteAdmin(adminId)

      res.status(200).json({ message: 'Admin Deleted Successfully', data: admin, state: 'success' })
    } catch (error: any) {
      res.status(500).json({ error: error.message })
    }
  }
}
