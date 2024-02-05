import prisma from '../prisma/prisma-client'

export class AdminDao {
    createAdmin = async (adminDto: {
        firstName: string
        lastName: string
        email: string
        password: string
        profilePic: string
        isDeleted: boolean
        deletedAt: Date
      }) => {

        const isExist = await prisma.admin.findUnique({
            where: {
                email: adminDto.email
            }
        })

        if (isExist) throw new Error('Admin already exist')

        const newAdmin = await prisma.admin.create({
            data: adminDto
        })

        return newAdmin
    }

}
