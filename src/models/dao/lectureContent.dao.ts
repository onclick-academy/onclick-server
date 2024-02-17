import prisma from '@models/prisma/prisma-client'

export class LectureContentDao {
    createLectureContent = async (lectureContentDto: any) => {
        // validate lectureId
        const lectureContent = await prisma.lecturesContent.create({
            data: lectureContentDto
        })
        return lectureContent
    }

    getLectureContentByLictureId = async (lectureId: string) => {
        // validate lectureId
        const lectureContent = await prisma.lecturesContent.findMany({
            where: {
                lectureId: lectureId
            }
        })
        return lectureContent
    }

    getLectureContentById = async (id: string) => {
        const lectureContent = await prisma.lecturesContent.findUnique({
            where: {
                id: id
            }
        })
        return lectureContent
    }

    updateLectureContent = async (lectureContentUpdate: LectureContentUpdateI) => {
        const lectureContent = await prisma.lecturesContent.update({
            where: {
                id: lectureContentUpdate.id
            },
            data: lectureContentUpdate
        })
        return lectureContent
    }

    hideLectureContent = async (id: string) => {
        const lectureContent = await prisma.lecturesContent.update({
            where: {
                id: id
            },
            data: {
                isDeleted: true
            }
        })
        return lectureContent
    }

    deleteLectureContent = async (id: string) => {
        const lectureContent = await prisma.lecturesContent.delete({
            where: {
                id: id
            }
        })
        return lectureContent
    }
}
