import { CourseDao } from "../models/dao/course.dao";
import { CourseDto } from "../models/dto/course.dto";
import { CourseValidation } from "../middlewares/validation/course/course.validation";

import { Request, Response } from 'express'


export class CourseController {

    static createCourse = async (req: Request, res: Response) => {
        const courseDao = new CourseDao()
        const courseDto = new CourseDto(req.body)
        console.log('req.body', req.body)
        console.log('course dto', courseDto)
        courseDto.adminId = req.params.adminId

        try {
            const { error } = await CourseValidation.createCourse(courseDto as CourseDtoI )
            if (error) throw new Error(error.details[0].message)
            const newCourse = await courseDao.createCourse(courseDto as CourseDtoI, req.params.topicId)

            return res.status(201).json({ message: 'Course created successfuly', data: newCourse, status: 'success' })
        } catch (error: any) {
            return res.status(400).json({ error: error.message, status: 'failed' })
        }
    }
}