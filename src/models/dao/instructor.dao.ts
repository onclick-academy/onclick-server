import prisma from '../prisma/prisma-client'
import { UserDao } from './user.dao'

interface InstructorDtoI {
    userId: string
    nationalID: string
    cvLink: string
    averageRate: number | 0
}

interface InstructorUpdateI {
    id?: string | undefined
    nationalID: string
    cvLink: string
    averageRate: number | 0
}

interface GlobalInstructorI {
    id: string
    createdAt: Date
    updatedAt: Date

    userId: string
    nationalID: string
    cvLink: string
    averageRate: number
    isVerified: boolean
}

export class InstructorDao {
    createInstructor = async (instructorDto: InstructorDtoI) => {
        const isExist = (await prisma.instructor.findUnique({
            where: {
                userId: instructorDto.userId
            }
        })) as GlobalInstructorI
        if (isExist) {
            throw new Error('Instructor already exists')
        }

        const instructorUser = await prisma.user.update({
            where: {
                id: instructorDto.userId
            },
            data: {
                role: 'INSTRUCTOR'
            }
        })

        const instructor = (await prisma.instructor.create({
            data: instructorDto
        })) as GlobalInstructorI

        return {
            instructor: instructor,
            user: instructorUser
        }
    }

    approveInstructor = async (id: string) => {
        const instructor = (await prisma.instructor.findUnique({
            where: {
                id: id
            }
        })) as GlobalInstructorI

        if (!instructor) {
            throw new Error('No instructor to approve')
        }

        const updatedInstructor = (await prisma.instructor.update({
            where: {
                id: instructor.id
            },
            data: {
                isVerified: true
            }
        })) as GlobalInstructorI

        return updatedInstructor
    }

    // TODO should we make a table to hold the declined instructors? NO
    declineInstructor = async (id: string) => {
        const instructor = await this.getInstructorById(id)

        const user = (await prisma.user.findUnique({
            where: {
                id: instructor.userId
            }
        })) as GlobalUserI
        if (!user) {
            throw new Error('No user found')
        }

        let deletedInstructor
        let updatedUser

        updatedUser = await prisma.user.update({
            where: {
                id: user.id
            },
            data: {
                role: 'STUDENT'
            }
        })
        console.log('updatedUser', updatedUser)

        deletedInstructor = await prisma.instructor.delete({
            where: {
                id
            }
        })
        console.log('deletedInstructor', deletedInstructor)

        return {
            message: 'Instructor declined',
            deletedInstructor: deletedInstructor,
            updatedUser: updatedUser
        }
    }

    getPendingInstructors = async () => {
        const instructors = (await prisma.instructor.findMany({
            where: {
                isVerified: false
            }
        })) as GlobalInstructorI[]
        return instructors
    }

    getAllInstructors = async () => {
        const instructors = (await prisma.instructor.findMany({
            where: {
                isVerified: true
            },
            include: {
                user: true
            }
        })) as GlobalInstructorI[]
        return instructors
    }

    getInstructorById = async (instructorId: string | undefined) => {
        const instructor = (await prisma.instructor.findUnique({
            where: {
                id: instructorId,
                isVerified: true
            }
        })) as GlobalInstructorI

        if (!instructor) {
            throw new Error('No instructor found')
        }

        return instructor
    }

    getInstructorUserById = async (instructorId: string) => {
        const instructor = await this.getInstructorById(instructorId)
        const userInstructor = (await prisma.user.findUnique({
            where: {
                id: instructor.userId
            },
            include: {
                instructor: true
            }
        })) as GlobalUserI

        return userInstructor
    }

    updateInstructor = async (instructorDto: InstructorUpdateI, userDto: UserUpdateI) => {
        const instructor = await this.getInstructorById(instructorDto.id)
        let updatedUser = null

        if (userDto) {
            updatedUser = (await prisma.user.update({
                where: {
                    id: instructor.userId
                },
                data: userDto
            })) as GlobalUserI
        }

        const updatedInstructor = (await prisma.instructor.update({
            where: {
                id: instructorDto.id
            },
            data: instructorDto
        })) as GlobalInstructorI

        const updatedInstructorWithUser = {
            ...updatedInstructor,
            user: updatedUser
        }
        return updatedInstructorWithUser
    }

    softDeleteInstructor = async (instructorId: string) => {
        const instructor = await prisma.instructor.findUnique({
            where: {
                id: instructorId
            }
        })

        if (!instructor) throw new Error('Instructor not found')

        const userDao = new UserDao()
        const deletedInstructor = await userDao.softDeleteUser(instructor.userId)

        return deletedInstructor
    }

    hardDeleteInstructor = async (instructorId: string) => {
        const instructor = await prisma.instructor.findUnique({
            where: {
                id: instructorId
            }
        })

        if (!instructor) throw new Error('Instructor not found')

        const userDao = new UserDao()
        const deletedInstructor = await userDao.hardDeleteUser(instructor.userId)

        return deletedInstructor
    }
    // TODO: check how to conect user with instructor in create => done
    // TODO update => done
    // TODO delete => to review
}
