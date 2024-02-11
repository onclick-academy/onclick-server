import { AdminDao } from '../models/dao/admin.dao'
import { AdminDto } from '../models/dto/admin.dto'
import { AdminValidation } from '../middlewares/validation/users/admin.validation'

import e, { Request, Response } from 'express'
import { AuthDao } from '../models/dao/auth.dao'
import { AuthController } from './auth.controller'
import prisma from '@models/prisma/prisma-client'

export class AdminController {
  // TODO send email to admin
  static createAdmin = async (req: Request, res: Response) => {
    const adminDto = new AdminDto(req.body)

    const adminDao = new AdminDao()

    try {
      const isExist = await prisma.user.findUnique({
        where: {
          email: adminDto.email
        }
      })
      if (isExist) throw new Error('Email already exist')

      const { error } = await AdminValidation.createAdmin(adminDto)
      if (error) return res.status(400).json({ error: error.details[0].message })

      const admin = await adminDao.createAdmin(adminDto)

      await AuthController.sendConfirmationEmail(req, res)
      res.status(201).json({ message: 'Admin created successfully', data: admin, state: 'success' })
    } catch (e: any) {
      return res.status(500).json({ error: e.message })
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
      if (error.message.includes('Admin')) return res.status(400).json({ error: error.message })
      return res.status(500).json({ error: error.message })
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
