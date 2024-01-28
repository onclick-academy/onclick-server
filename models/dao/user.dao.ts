import prisma from '../prisma/prisma-client'

export class userDao {
  // create- getAll - getOne - update - delete
  createUser = async (user: UserInterface) => {
    const newUser = await prisma.user.create({
      data: user
    })
    return newUser
  }
}
