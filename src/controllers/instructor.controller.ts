import { InstructorDao } from "../models/dao/instructor.dao";
import { InstructorDto } from "../models/dto/instructor.dto";
import { InstructorValidation } from "../middlewares/validation/users/instructor.validation";

import { Request, Response } from "express";
import { UserDao } from "../models/dao/user.dao";
import jwt from 'jsonwebtoken'

export class InstructorController {

    static ApplyInstructor = async (req: Request, res: Response) => {
        const instructorDto = new InstructorDto(req.body)
        const accessToken = req.headers['authorization'] as unknown as string
        console.log(accessToken)
        const { id } = jwt.verify(accessToken.split(' ')[1] as string, process.env.JWT_SECRET_KEY as string) as {id: string}

        instructorDto.userId = id

        // console.log(instructorDto, id)

        try {
            const { error } = await InstructorValidation.createInstructor(instructorDto)

            if (error) return res.status(400).json({ error: error.details[0].message })

            const instructorDao = new InstructorDao()

            const instructor = await instructorDao.createInstructor(instructorDto)

            res.status(201).json({message: 'applied to be an Instructor successfuly.', data: instructor, state: "success"})
        } catch (error: any) {
            res.status(500).json({ error: error.message })
        }
    }

    static approveAndCreateInstructor = async (req: Request, res: Response) => {
        const instructorDao = new InstructorDao()
        const userDao = new UserDao()

        const { instructorId } = req.body // TODO - discuss with team

        try {
        const instructor = await instructorDao.approveInstructor(instructorId)

        const updatedUser = await userDao.updateUser({ id: instructor.userId, role: 'INSTRUCTOR' })

            res.status(201).json({message: 'Instructor created successfully', data: instructor, dataUser: updatedUser , state: "success"})
        } catch (error: any) {
            res.status(500).json({ error: error.message })
        }
    }

}