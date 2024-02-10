import prisma from "../prisma/prisma-client";

export class StudentDao {
    createStudent = async (studentDto: StudentDtoI) => {
        const isExist = await prisma.student.findUnique({
            where: {
                userId: studentDto.userId
            }
        }) as GlobalStudentI

        if (isExist) {
            throw new Error('Student already exists')
        }

        const student = await prisma.student.create({
            data: studentDto
        }) as GlobalStudentI

        return student
    }
}