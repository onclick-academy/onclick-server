import prisma from '../prisma/prisma-client'
import { comparePassword } from '../../utilities/hash'
import { UserTokenI } from '../../../types/user.interface'

export class AuthDao {
  login = async (userDto: loginDtoI) => {
    let user: UserTokenI | undefined

    if (userDto.email) {
      user = (await prisma.user.findUnique({
        where: {
          email: userDto.email,
          isDeleted: false
        }
      })) as GlobalUserI

      if (!user) throw new Error('Email is not found please register')
      if (!user.isAvailable) {
        user.isAvailable = true
      }
    }

    if (userDto.username) {
      user = (await prisma.user.findUnique({
        where: {
          username: userDto.username,
          isDeleted: false
        }
      })) as GlobalUserI

      if (!user) throw new Error('Username is not correct')
      if (!user.isAvailable) {
        user.isAvailable = true
      }
    }
    const isPasswordCorrect = await comparePassword(userDto.password, user?.password)
    if (!isPasswordCorrect) throw new Error('Email or password is not correct **')

    return user
  }

  getUserByEmail = async (userDto: { email: string }) => {
    const user = await prisma.user.findUnique({
      where: {
        email: userDto.email,
        isDeleted: false
      }
    })
    if (!user) throw new Error('Email is not found please register')
    return user
  }
}
