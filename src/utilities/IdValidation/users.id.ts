import prisma from '@models/prisma/prisma-client'

export async function UserIdValidation(userId: string) {
    const user = await prisma.user.findUnique({
        where: {
            id: userId,
            isDeleted: false
        }
    })

    if (!user) {
        throw new Error('User not found')
    }
}

export async function InstructorIdValidation(instructorId: string) {
    const instructor = await prisma.instructor.findUnique({
        where: {
            id: instructorId
        }
    })

    if (!instructor) {
        throw new Error('Instructor not found')
    }
}
