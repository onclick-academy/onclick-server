import { InstructorDao } from '../models/dao/instructor.dao'
import { InstructorDto } from '../models/dto/instructor.dto'
import { InstructorValidation } from '../middlewares/validation/users/instructor.validation'

import { Request, Response } from 'express'
import { UserDao } from '../models/dao/user.dao'
import jwt from 'jsonwebtoken'
import { UserDto } from '../models/dto/user.dto'
import { roles } from '../..'
import { InstructorIdValidation, UserIdValidation } from '@utilities/IdValidation/users.id'

export class InstructorController {
    static ApplyInstructor = async (req: any, res: Response) => {
        const instructorDto = new InstructorDto(req.body)
        const { id } = req.user
        console.log('id', req.user)

        instructorDto.userId = id

        try {

            await UserIdValidation(instructorDto.userId)

            const { error } = await InstructorValidation.createInstructor(instructorDto)
            if (error) return res.status(400).json({ error: error.details[0].message })

            const instructorDao = new InstructorDao()
            const instructor = await instructorDao.createInstructor(instructorDto)

            res.status(201).json({
                message: 'applied to be an Instructor successfuly.',
                data: instructor,
                state: 'success'
            })
        } catch (error: any) {
            res.status(500).json({ error: error.message })
        }
    }

    static approveAndCreateInstructor = async (req: Request, res: Response) => {
        const instructorDao = new InstructorDao()
        const userDao = new UserDao()

        const { instructorId } = req.body // TODO - discuss with team

        console.log(instructorId)

        try {

            await InstructorIdValidation(instructorId)

            const instructor = await instructorDao.approveInstructor(instructorId)

            const updatedUser = await userDao.updateUser({ id: instructor.userId, role: roles.INSTRUCTOR })

            res.status(201).json({
                message: 'Instructor created successfully',
                data: instructor,
                dataUser: updatedUser,
                state: 'success'
            })
        } catch (error: any) {
            console.log(error)
            res.status(500).json({ error: error.message, status: 'failed' })
        }
    }

    static declineInstructor = async (req: Request, res: Response) => {
        const instructorDao = new InstructorDao()

        const { instructorId } = req.body // TODO - discuss with team

        try {

            await InstructorIdValidation(instructorId)

            const instructor = await instructorDao.declineInstructor(instructorId)

            res.status(201).json({ message: 'Instructor declined successfully', data: instructor, state: 'success' })
        } catch (error: any) {
            res.status(500).json({ error: error.message })
        }
    }

    static getPendingInstructors = async (req: Request, res: Response) => {
        const instructorDao = new InstructorDao()

        try {
            const instructors = await instructorDao.getPendingInstructors()

            res.status(200).json({
                message: 'Pending Instructors retreived successufuly',
                data: instructors,
                state: 'success'
            })
        } catch (error: any) {
            res.status(500).json({ error: error.message })
        }
    }

    static getAllVerifiedInstructors = async (req: Request, res: Response) => {
        const instructorDao = new InstructorDao()

        try {
            const instructors = await instructorDao.getAllInstructors()

            res.status(200).json({
                message: 'All Instructors retreived successufuly',
                data: instructors,
                state: 'success'
            })
        } catch (error: any) {
            res.status(500).json({ error: error.message })
        }
    }

    // static getInstructorById = async (req: Request, res: Response) => {
    //     const instructorDao = new InstructorDao()

    //     const { instructorId } = req.params

    //     try {
    //         const instructor = await instructorDao.getInstructorById(instructorId)

    //         res.status(200).json({message: "Instructor retreived successufuly",data: instructor, state: "success"})
    //     } catch (error: any) {
    //         res.status(500).json({ error: error.message })
    //     }
    // }

    static getInstructorUserById = async (req: Request, res: Response) => {
        const instructorDao = new InstructorDao()

        const { instructorId } = req.params // TODO - discuss with team

        try {
            const instructor = await instructorDao.getInstructorUserById(instructorId)

            res.status(200).json({ message: 'Instructor retreived successufuly', data: instructor, state: 'success' })
        } catch (error: any) {
            res.status(500).json({ error: error.message })
        }
    }

    static updateInstructor = async (req: Request, res: Response) => {
        const instructorDao = new InstructorDao()

        const instructorDto = new InstructorDto(req.body)
        instructorDto.id = req.params.instructorId
        const userDto = new UserDto(req.body)

        try {

            await InstructorIdValidation(instructorDto.id)

            const { error } = await InstructorValidation.updateInstructor(instructorDto)

            if (error) return res.status(400).json({ error: error.details[0].message })

            const instructor = await instructorDao.updateInstructor(instructorDto, userDto)

            res.status(201).json({ message: 'Instructor updated successfully', data: instructor, state: 'success' })
        } catch (error: any) {
            res.status(500).json({ error: error.message })
        }
    }

    static softDeleteInstructor = async (req: Request, res: Response) => {
        const { instructorId } = req.params
        const instructorDao = new InstructorDao()

        try {

            await InstructorIdValidation(instructorId)

            const instructor = await instructorDao.softDeleteInstructor(instructorId)

            res.status(201).json({
                message: 'Instructor deleted (softly) successfully',
                data: instructor,
                state: 'success'
            })
        } catch (error: any) {
            res.status(500).json({ error: error.message })
        }
    }

    static hardDeleteInstructor = async (req: Request, res: Response) => {
        const { instructorId } = req.params
        const instructorDao = new InstructorDao()

        try {

            await InstructorIdValidation(instructorId)

            const instructor = await instructorDao.hardDeleteInstructor(instructorId)

            res.status(201).json({
                message: 'Instructor deleted (hardly) successfully',
                data: instructor,
                state: 'success'
            })
        } catch (error: any) {
            res.status(500).json({ error: error.message })
        }
    }
}
