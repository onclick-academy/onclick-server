import { AdminDao } from "../models/dao/admin.dao";
import { AdminDto } from "../models/dto/admin.dto";
import { AdminValidation } from "../middlewares/validation/users/admin.validation";

import { Request, Response } from "express";
import sendEmail from "../utilities/email";
export class AdminController {

    static createAdmin = async (req: Request, res: Response) => {
        const adminDto = new AdminDto(req.body)

        const adminDao = new AdminDao()

        try {
            const { error } = await AdminValidation.createAdmin(adminDto)

            if (error) return res.status(400).json({ error: error.details[0].message })

            const admin = await adminDao.createAdmin(adminDto)
            // sendEmail(req, res, admin, 'Confirm')
            // TODO send email to admin

            res.status(201).json({message: 'Admin created successfully', data: admin, state: "success"})
        } catch (error: any) {
            res.status(500).json({ error: error.message })
        }
    }

}