import prisma from '@models/prisma/prisma-client'

export class LectureDao {
    createLecture = async (lectureDto: any) => {
        const lecture = await prisma.lecture.create({
            data: lectureDto
        })
        return lecture
    }

    getLectureBySectionId = async (sectionId: string) => {
        const lecture = await prisma.lecture.findMany({
            where: {
                sectionId
            }
        })
        return lecture
    }

    getLectureById = async (id: string) => {
        const lecture = await prisma.lecture.findUnique({
            where: {
                id: id
            }
        })
        return lecture
    }

    updateLecture = async (lectureDto: LectureUpdateI) => {
        const lecture = await prisma.lecture.update({
            where: {
                id: lectureDto.id
            },
            data: lectureDto
        })
        return lecture
    }

    softDeleteLecture = async (id: string) => {
        const lecture = await prisma.lecture.update({
            where: {
                id: id
            },
            data: {
                isDeleted: true
            }
        })
        return lecture
    }

    hardDeleteLecture = async (id: string) => {
        const lecture = await prisma.lecture.delete({
            where: {
                id: id
            }
        })
        return lecture
    }
}
