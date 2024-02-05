import { InstructorDao } from "../models/dao/instructor.dao";
import { InstructorDto } from "../models/dto/instructor.dto";
import { InstructorValidation } from "../middlewares/validation/users/instructor.validation";

import { Request, Response } from "express";

export class InstructorController {

    static createInstructor = async (req: Request, res: Response) => {
        const instructorDto = new InstructorDto(req.body)
        instructorDto.userId = req.params.userId

        const instructorDao = new InstructorDao()

        try {
            const { error } = await InstructorValidation.createInstructor(instructorDto)

            if (error) return res.status(400).json({ error: error.details[0].message })

            const instructor = await instructorDao.createInstructor(instructorDto)

            res.status(201).json({message: 'Instructor created successfully', data: instructor, state: "success"})
        } catch (error: any) {
            res.status(500).json({ error: error.message })
        }
    }

}