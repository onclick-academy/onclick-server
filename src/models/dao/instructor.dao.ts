import prisma from '../prisma/prisma-client'

interface InstructorDtoI {
  userId: string
  nationalID: string
  cvLink: string
  averageRate: number | 0
}

interface GlobalInstructorI {
  id: string
  createdAt: Date
  updatedAt: Date

  userId: string
  nationalID: string
  cvLink: string
  averageRate: number
  isVerified: boolean
}
export class InstructorDao {
  createInstructor = async (instructorDto: InstructorDtoI) => {
    const isExist = await prisma.instructor.findUnique({
      where: {
        userId: instructorDto.userId
      }
    }) as GlobalInstructorI

    if (isExist) {
      throw new Error('Instructor already exists')
    }

    const instructor = await prisma.instructor.create({
      data: instructorDto
    }) as GlobalInstructorI

    return instructor
  }

  approveInstructor = async (id: string) => {
    const instructor = await prisma.instructor.findUnique({
      where: {
        id: id
      }
    }) as GlobalInstructorI

    if (!instructor) {
      throw new Error('No instructor to approve')
    }

    const updatedInstructor = await prisma.instructor.update({
      where: {
        id: instructor.id
      },
      data: {
        isVerified: true
      }
    }) as GlobalInstructorI

    return updatedInstructor
  }

  getAllInstructors = async () => {
    const instructors = await prisma.instructor.findMany() as GlobalInstructorI[]
    return instructors
  }

  getInstructorById = async (instructorId: string) => {
    const instructor = await prisma.instructor.findUnique({
      where: {
        id: instructorId
      }
    }) as GlobalInstructorI
    return instructor
  }

  updateInstructor = async (instructorDto: GlobalInstructorI) => {
    const updatedInstructor = await prisma.instructor.update({
      where: {
        id: instructorDto.id
      },
      data: instructorDto
    }) as GlobalInstructorI
    return updatedInstructor
  }

  // TODO: check how to conect user with instructor in create => done
  // TODO update and delete
}
