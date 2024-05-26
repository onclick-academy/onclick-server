import prisma from '@models/prisma/prisma-client'

export class CourseEnrollmentDao {
    createEnrollment = async (courseEnrollmentDto: CourseEnrollmentDtoI) => {
        const enrollment = await prisma.courseEnrollment.create({
            data: {
                courseId: courseEnrollmentDto.courseId,
                userId: courseEnrollmentDto.userId
            }
        })
        return enrollment
    }

    isUserEnrolled = async (courseEnrollmentDto: CourseEnrollmentDtoI) => {
        const enrollment = await prisma.courseEnrollment.findFirst({
            where: {
                courseId: courseEnrollmentDto.courseId,
                userId: courseEnrollmentDto.userId
            }
        })
        if (!enrollment) return false
        return true
    }

    getEnrollmentsByCourseId = async (courseId: string) => {
        const enrollments = await prisma.courseEnrollment.findMany({
            where: {
                courseId
            }
        })
        return enrollments
    }

    getEnrollmentsByUserId = async (userId: string) => {
        const enrollments = await prisma.courseEnrollment.findMany({
            where: {
                userId
            }
        })
        return enrollments
    }
}
