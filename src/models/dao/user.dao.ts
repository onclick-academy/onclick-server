import prisma from '../prisma/prisma-client'
import { hashPassword } from '../../utilities/hash'

export class UserDao {
  createUser = async (userDto: UserDtoI) => {
    const isExistedUser = await prisma.user.findUnique({
      where: {
        email: userDto.email,
        isDeleted: false
      }
    })
    if (isExistedUser) throw new Error('Email is already in use')

    const isExistedUsername = await prisma.user.findUnique({
      where: {
        username: userDto.username
      }
    })
    if (isExistedUsername) throw new Error('Username is not available')

    const isExistedPhone = await prisma.user.findUnique({
      where: {
        phoneNum: userDto.phoneNum
      }
    })
    if (isExistedPhone) throw new Error('Phone number is already in use')

    // TODO check valid birthDate
    const hashedPassword = await hashPassword(userDto.password)
    userDto.password = hashedPassword
    userDto.birthDate = new Date(userDto.birthDate)

    const newUser = await prisma.user.create({
      data: userDto
    })
    return newUser
  }

  getAllUsers = async () => {
    const users = await prisma.user.findMany({
      where: {
        isDeleted: false
      }
    })
    return users
  }

  getUserById = async (id: string) => {
    const user = await prisma.user.findUnique({
      where: {
        id: id,
        isDeleted: false
      }
    })
    return user
  }

  updateUser = async (user: UserUpdateI) => {
    const updatedUser = await prisma.user.update({
      where: {
        id: user.id,
        isDeleted: false
      },
      data: user
    })
    return updatedUser
  }

  softDeleteUser = async (id: string) => {
    const deletedUser = await prisma.user.update({
      where: {
        id: id,
        isDeleted: false,
        isAvailable: true
      },
      data: {
        isDeleted: true,
        deletedAt: new Date(),
        isAvailable: false
      }
    })
    return deletedUser
  }

  deactivateUser = async (id: string) => {
    const deactivatedUser = await prisma.user.update({
      where: {
        id: id,
        isDeleted: false,
        isAvailable: true
      },
      data: {
        isAvailable: false
      }
    })
    return deactivatedUser
  }

  hardDeleteUser = async (id: string) => {
    const deletedUser = await prisma.user.delete({
      where: {
        id: id
      }
    })
    return deletedUser
  }
}
