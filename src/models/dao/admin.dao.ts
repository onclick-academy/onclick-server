import { roles } from '../../..'
import prisma from '../prisma/prisma-client'
export class AdminDao {
    isExist = async (ele: string, type: string) => {
        let isExist
        if (type === 'email') {
            isExist = await prisma.user.findUnique({
                where: {
                    email: ele
                }
            })
        }
        if (isExist) {
            throw new Error('Email is already in use')
        }
    }

    // TODO update User table role: ADMIN or WHAT WE SHOULD DO??
    createAdmin = async (adminDto: UserDtoI) => {
        await this.isExist(adminDto.email, 'email')

        const user = await prisma.user.findUnique({
            where: {
                email: adminDto.email
            }
        })
        if (!user) throw Error()

        const newAdmin = await prisma.user.create({
            data: adminDto
        })

        return newAdmin
    }

    getAllAdmins = async () => {
        const admins = await prisma.user.findMany({
            where: {
                isDeleted: false
            }
        })

        return admins
    }

    getAdminById = async (id: string) => {
        const admin = await prisma.user.findUnique({
            where: {
                id
            }
        })

        return admin
    }

    updateAdmin = async (adminDto: {
        id?: string
        firstName?: string
        lastName?: string
        email?: string
        password?: string
        profilePic?: string
        isDeleted?: boolean
        deletedAt?: Date
        isEmailConfirm?: boolean
    }) => {
        const admin = await this.getAdminById(adminDto.id as string)

        if (!admin) throw new Error('Admin not found')

        if (adminDto.email) {
            await this.isExist(adminDto.email, 'email')
            await prisma.user.findUnique({
                where: {
                    email: adminDto.email,
                    role: roles.ADMIN
                }
            })
        }

        const updatedAdmin = await prisma.user.update({
            where: {
                id: adminDto.id
            },
            data: adminDto
        })

        return updatedAdmin
    }

    softDeleteAdmin = async (id: string) => {
        const admin = await this.getAdminById(id)

        if (!admin) throw new Error('Admin not found')

        const deletedAdmin = await prisma.user.update({
            where: {
                id
            },
            data: {
                isDeleted: true,
                deletedAt: new Date()
            }
        })

        return deletedAdmin
    }

    hardDeleteAdmin = async (id: string) => {
        const admin = await this.getAdminById(id)

        if (!admin) throw new Error('Admin not found')

        const deletedAdmin = await prisma.user.delete({
            where: {
                id
            }
        })

        return deletedAdmin
    }
}
