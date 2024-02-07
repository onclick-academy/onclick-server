import prisma from '../prisma/prisma-client'

export class StudentDao {
  createStudent = async (studentDto: StudentDtoI) => {
    const confirmStudent = await prisma.student.findUnique({
      where: {
        userId: studentDto.id
      }
    })
    if (confirmStudent) {
      throw new Error('Student already exists')
    } else {
      const student = await prisma.student.create({
        data: {
          id: studentDto.id,
          userId: studentDto.studentId,
          educationLevel: studentDto.educationLevel
        }
      })
      return student
    }
  }
}
