import { hashPassword } from '../../utilities/hash'
import prisma from '../prisma/prisma-client'

export class UserDao {
  createUser = async (userDto: UserInterface) => {
    const isExistedUser = await prisma.user.findUnique({
      where: {
        email: userDto.email
      }
    })
    if (isExistedUser) throw new Error('Email is already in use')

    const isExistedUsername = await prisma.user.findUnique({
      where: {
        username: userDto.username
      }
    })
    if (isExistedUsername) throw new Error('Username is not available')
    // TODO check valid birthDate
    const hashedPassword = await hashPassword(userDto.password)
    userDto.password = hashedPassword

    const newUser = await prisma.user.create({
      data: userDto
    })
    return newUser
  }

  getAllUsers = async () => {
    const users = await prisma.user.findMany()
    return users
  }

  getUserById = async (id: string) => {
    const user = await prisma.user.findUnique({
      where: {
        id: id
      }
    })
    return user
  }

  updateUser = async (id: string, user: UserInterface) => {
    const updatedUser = await prisma.user.update({
      where: {
        id: id
      },
      data: user
    })
    return updatedUser
  }

  deleteUser = async (id: string) => {
    const deletedUser = await prisma.user.delete({
      where: {
        id: id
      }
    })
    return deletedUser
  }
}
