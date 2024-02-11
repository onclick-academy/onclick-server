import { CourseDao } from '../models/dao/course.dao'
import { CourseDto } from '../models/dto/course.dto'
import { CourseValidation } from '../middlewares/validation/course/course.validation'

import { Request, Response } from 'express'

export class CourseController {
    static applyCourse = async (req: Request, res: Response) => {
        const courseDao = new CourseDao()
        const courseDto = new CourseDto(req.body)
        console.log('req.body', req.body)
        console.log('course dto', courseDto)

        try {
            const { error } = await CourseValidation.createCourse(courseDto as CourseDtoI)
            if (error) throw new Error(error.details[0].message)

            const newCourse = await courseDao.applyCourse(courseDto as CourseDtoI)

            return res.status(201).json({ message: 'Course created successfuly', data: newCourse, status: 'success' })
        } catch (error: any) {
            return res.status(400).json({ error: error.message, status: 'failed' })
        }
    }

    static getAllCourses = async (req: Request, res: Response) => {
        const courseDao = new CourseDao()
        try {
            const courses = await courseDao.getAllCourses()
            return res.status(200).json({ message: 'Courses fetched successfuly', data: courses, status: 'success' })
        } catch (error: any) {
            return res.status(400).json({ error: error.message, status: 'failed' })
        }
    }

    static getCourseById = async (req: Request, res: Response) => {
        const courseDao = new CourseDao()
        try {
            const course = await courseDao.getCourseById(req.params.courseId)
            return res.status(200).json({ message: 'Course fetched successfuly', data: course, status: 'success' })
        } catch (error: any) {
            return res.status(400).json({ error: error.message, status: 'failed' })
        }
    }

    static getCoursesByInstructorId = async (req: Request, res: Response) => {
        const courseDao = new CourseDao()
        try {
            const courses = await courseDao.getCoursesByInstructorId(req.params.instructorId)
            return res.status(200).json({ message: 'Courses fetched successfuly', data: courses, status: 'success' })
        } catch (error: any) {
            return res.status(400).json({ error: error.message, status: 'failed' })
        }
    }

    static getCoursesByCategoryId = async (req: Request, res: Response) => {
        const courseDao = new CourseDao()
        try {
            const courses = await courseDao.getCoursesByCategoryId(req.params.categoryId)
            return res.status(200).json({ message: 'Courses fetched successfuly', data: courses, status: 'success' })
        } catch (error: any) {
            return res.status(400).json({ error: error.message, status: 'failed' })
        }
    }

    static getCoursesBySubCategoryId = async (req: Request, res: Response) => {
        const courseDao = new CourseDao()
        try {
            const courses = await courseDao.getCoursesBySubCategoryId(req.params.subCategoryId)
            return res.status(200).json({ message: 'Courses fetched successfuly', data: courses, status: 'success' })
        } catch (error: any) {
            return res.status(400).json({ error: error.message, status: 'failed' })
        }
    }

    static getCoursesByTopicId = async (req: Request, res: Response) => {
        const courseDao = new CourseDao()
        try {
            const courses = await courseDao.getCoursesByTopicId(req.params.topicId)
            return res.status(200).json({ message: 'Courses fetched successfuly', data: courses, status: 'success' })
        } catch (error: any) {
            return res.status(400).json({ error: error.message, status: 'failed' })
        }
    }

    // TODO
    static searchCourses = async (req: Request, res: Response) => {
        const courseDao = new CourseDao()
        try {
            const courses = await courseDao.searchCourses(req.query.q as string)
            return res.status(200).json({ message: 'Courses fetched successfuly', data: courses, status: 'success' })
        } catch (error: any) {
            return res.status(400).json({ error: error.message, status: 'failed' })
        }
    }

    static updateCourse = async (req: Request, res: Response) => {
        const courseDao = new CourseDao()
        const courseDto = new CourseDto(req.body)
        courseDto.id = req.params.courseId

        try {
            const { error } = await CourseValidation.updateCourse(courseDto as CourseUpdateI)

            if (error) throw new Error(error.details[0].message)

            const updatedCourse = await courseDao.updateCourse(courseDto as CourseUpdateI)

            return res
                .status(200)
                .json({ message: 'Course updated successfuly', data: updatedCourse, status: 'success' })
        } catch (error: any) {
            return res.status(400).json({ error: error.message, status: 'failed' })
        }
    }

    static deleteCourse = async (req: Request, res: Response) => {
        const courseDao = new CourseDao()
        try {
            const deletedCourse = await courseDao.deleteCourse(req.params.courseId)
            return res
                .status(200)
                .json({ message: 'Course deleted successfuly', data: deletedCourse, status: 'success' })
        } catch (error: any) {
            return res.status(400).json({ error: error.message, status: 'failed' })
        }
    }
}
