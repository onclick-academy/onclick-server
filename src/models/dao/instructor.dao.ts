import prisma from "../prisma/prisma-client";

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

        const user = await prisma.instructor.create({
            data: instructorDto
        }) as GlobalInstructorI

        return user
    }
}