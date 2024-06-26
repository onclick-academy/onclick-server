import prisma from '@models/prisma/prisma-client'
import { hashPassword } from '../../utilities/hash'
import { roles } from '../../index'

export class UserDao {
    isExist = async (ele: string, type: string) => {
        let isExist
        if (type === 'email') {
            isExist = await prisma.user.findUnique({
                where: {
                    email: ele
                }
            })
        } else if (type === 'username') {
            isExist = await prisma.user.findUnique({
                where: {
                    username: ele
                }
            })
        } else if (type === 'phoneNum') {
            isExist = await prisma.user.findUnique({
                where: {
                    phoneNum: ele
                }
            })
        }
        if (isExist) {
            throw new Error(
                `${type === 'email' ? 'Email' : type === 'username' ? 'Username' : 'Phone Number'} is already in use`
            )
        }
    }

    createUser = async (userDto: any) => {
        await this.isExist(userDto.email, 'email')
        await this.isExist(userDto.username, 'username')
        await this.isExist(userDto.phoneNum, 'phoneNum')
        // TODO check valid birthDate
        const hashedPassword = await hashPassword(userDto.password)
        userDto.password = hashedPassword
        userDto.birthDate = new Date(userDto.birthDate)

        // check user is 15+ years old
        const today = new Date()
        const birthDate = new Date(userDto.birthDate)
        let age = today.getFullYear() - birthDate.getFullYear()
        const m = today.getMonth() - birthDate.getMonth()
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--
        }
        if (age < 9) throw Error('User must be 9+ years old')

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

    getAllAdmins = async () => {
        const admins = await prisma.user.findMany({
            where: {
                role: roles.ADMIN || roles.SUPER_ADMIN,
                isDeleted: false
            }
        })
        return admins
    }

    getUserById = async (id: string) => {
        if (!id) throw Error('Invalid ID')
        const user = await prisma.user.findUnique({
            where: {
                id: id
            }
        })
        return user
    }

    searchUser = async (search: string) => {
        const users = await prisma.user.findMany({
            where: {
                OR: [
                    {
                        username: {
                            contains: search,
                            mode: 'insensitive'
                        }
                    },
                    {
                        firstName: {
                            contains: search,
                            mode: 'insensitive'
                        }
                    },
                    {
                        lastName: {
                            contains: search,
                            mode: 'insensitive'
                        }
                    },
                    {
                        email: {
                            contains: search,
                            mode: 'insensitive'
                        }
                    },
                    {
                        phoneNum: {
                            contains: search,
                            mode: 'insensitive'
                        }
                    },
                    {
                        bio: {
                            contains: search,
                            mode: 'insensitive'
                        }
                    }
                ],
                isDeleted: false
            }
        })
        return users
    }

    updateUser = async (user: any) => {
        console.log('from dao user', user)
        // await this.getUserById(user.id)
        user.updatedAt = new Date()
        let updatedUser = {}
        if (user.birthDate) user.birthDate = new Date(user.birthDate)
        if (user.username) await this.isExist(user.username, 'username')
        if (user.role) {
            updatedUser = await prisma.user.update({
                where: {
                    id: user.id
                },
                data: {
                    role: user.role
                }
            })

            return updatedUser
        }
        if (user.email) {
            await this.isExist(user.email, 'email')
            const pUser = await prisma.user.findUnique({
                where: {
                    email: user.email
                }
            })
            if (!pUser) throw Error('Invalid Email')
        }
        if (user.phoneNum) await this.isExist(user.phoneNum, 'phoneNum')

        updatedUser = await prisma.user.update({
            where: {
                id: user.id
            },
            data: user
        })
        return updatedUser
    }

    softDeleteUser = async (id: string) => {
        await this.getUserById(id)

        const deletedUser = await prisma.user.update({
            where: {
                id: id,
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
        await this.getUserById(id)

        const deactivatedUser = await prisma.user.update({
            where: {
                id: id,
                isAvailable: true
            },
            data: {
                isAvailable: false
            }
        })
        return deactivatedUser
    }

    hardDeleteUser = async (id: string | undefined) => {
        const deletedUser = await prisma.user.delete({
            where: {
                id: id
            }
        })
        return deletedUser
    }

    applyInstructor = async (userId: string) => {
        const user = await this.getUserById(userId)
        if (user.role === roles.INSTRUCTOR) throw Error('User is already an Instructor')
        const instructor = await prisma.user.update({
            where: {
                id: userId
            },
            data: {
                role: roles.INSTRUCTOR
            }
        })
        return instructor
    }

    approveInstructor = async (userId: string) => {
        const user = await this.getUserById(userId)
        if (user.role !== roles.INSTRUCTOR) throw Error('User has not applied to be an Instructor')
        const instructor = await prisma.user.update({
            where: {
                id: userId
            },
            data: {
                isApprovedAsInstructor: true
            }
        })
        return instructor
    }

    declineInstructor = async (userId: string) => {
        const user = await this.getUserById(userId)
        if (user.role !== roles.INSTRUCTOR) throw Error('User has not applied to be an Instructor')
        const instructor = await prisma.user.update({
            where: {
                id: userId
            },
            data: {
                role: roles.STUDENT,
                isApprovedAsInstructor: false
            }
        })
        return instructor
    }

    getPendingInstructors = async () => {
        const instructors = await prisma.user.findMany({
            where: {
                role: roles.INSTRUCTOR,
                isApprovedAsInstructor: false,
                isDeleted: false
            }
        })
        return instructors
    }

    getApprovedInstructors = async () => {
        const instructors = await prisma.user.findMany({
            where: {
                role: roles.INSTRUCTOR,
                isApprovedAsInstructor: true,
                isDeleted: false
            }
        })
        return instructors
    }

    getInstructorById = async (id: string) => {
        const instructor = await prisma.user.findUnique({
            where: {
                id: id,
                role: roles.INSTRUCTOR,
                isApprovedAsInstructor: true
            }
        })
        return instructor
    }
    getAllInstructors = async ({ limit, offset }) => {
        const instructors = await prisma.user.findMany({
            where: {
                role: roles.INSTRUCTOR,
                isDeleted: false
            },
            take: limit,
            skip: offset
        })
        return instructors
    }
}
