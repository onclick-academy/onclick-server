import prisma from '@models/prisma/prisma-client'

export class SectionDao {
    createSection = async (sectionDto: SectionDtoI) => {
        const lecture = await prisma.section.create({
            data: {
                ...sectionDto,
                courseId: sectionDto.courseId // Add the courseId property explicitly
            }
        })
        return lecture
    }

    getSectionById = async (id: string) => {
        const lecture = await prisma.section.findUnique({
            where: {
                id
            }
        })
        if (!lecture) throw new Error('Lecture not found')

        return lecture
    }

    getSictionsByCourseId = async (courseId: string) => {
        // TODO course Id validation
        const lectures = await prisma.section.findMany({
            where: {
                courseId
            }
        })
        return lectures
    }

    updateSection = async (lectureDto: SectionUpdateDtoI) => {
        const updatedLecture = await prisma.section.update({
            where: {
                id: lectureDto.id
            },
            data: lectureDto
        })
        return updatedLecture
    }

    // in editing if declined or to not be shown
    softDeleteSection = async (id: string) => {
        const deletedLecture = await prisma.section.update({
            where: {
                id
            },
            data: {
                isDeleted: true,
                deletedAt: new Date()
            }
        })
        return deletedLecture
    }

    hardDeleteSection = async (id: string) => {
        const deletedLecture = await prisma.section.delete({
            where: {
                id
            }
        })
        return deletedLecture
    }
}
