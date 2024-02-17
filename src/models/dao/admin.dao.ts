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
  isExist = async (ele: string, type: string) => {
    let isExist
    if (type === 'email') {
      isExist = await prisma.admin.findUnique({
        where: {
          email: ele
        }
      })
    }
    if (isExist) {
      throw new Error('Email is already in use')
    }
  }

  createAdmin = async (adminDto: AdminDtoI) => {
    await this.isExist(adminDto.email, 'email')

    const user = await prisma.user.findUnique({
      where: {
        email: adminDto.email
      }
    })

    if (user) {
      throw new Error('Email is already in use')
    }

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

    if (adminDto.email) {
      await this.isExist(adminDto.email, 'email')
      const user = await prisma.admin.findUnique({
        where: {
          email: adminDto.email
        }
      })
    }

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
