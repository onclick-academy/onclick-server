import prisma from '../prisma/prisma-client'

interface AdminDtoI {
  id: string | undefined
  firstName: string
  lastName: string
  email: string
  password: string
  profilePic: string
  isDeleted: boolean
  deletedAt: Date
  isEmailConfirm: boolean
}
export class AdminDao {
  createAdmin = async (adminDto: AdminDtoI) => {
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

  getAllAdmins = async () => {
    const admins = await prisma.admin.findMany({
      where: {
        isDeleted: false
      }
    })

    return admins
  }

  getAdminById = async (id: string) => {
    const admin = await prisma.admin.findUnique({
      where: {
        id
      }
    })

    return admin
  }

  updateAdmin = async (adminDto: {
    id: string | undefined
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

    const updatedAdmin = await prisma.admin.update({
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

    const deletedAdmin = await prisma.admin.update({
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

    const deletedAdmin = await prisma.admin.delete({
      where: {
        id
      }
    })

    return deletedAdmin
  }
}
