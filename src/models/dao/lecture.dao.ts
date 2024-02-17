import prisma from "@models/prisma/prisma-client";

export class LectureDao {

    createLecture = async (lectureDto: LectureDtoI) => {
        // TODO course Id validation
        const lecture = await prisma.lecture.create({
            data: lectureDto
        });
        return lecture;
    }

    getLectureById = async (id: string) => {
        const lecture = await prisma.lecture.findUnique({
            where: {
                id
            }
        });
        if (!lecture) throw new Error('Lecture not found');

        return lecture;
    }

    getLecturesByCourseId = async (courseId: string) => {
        // TODO course Id validation
        const lectures = await prisma.lecture.findMany({
            where: {
                courseId
            }
        });
        return lectures;
    }

    updateLecture = async (lectureDto: LectureUpdateI) => {
        const updatedLecture = await prisma.lecture.update({
            where: {
                id: lectureDto.id
            },
            data: lectureDto
        });
        return updatedLecture;
    }

    // in editing if declined or to not be shown
    softDeleteLecture = async (id: string) => {
        const deletedLecture = await prisma.lecture.update({
            where: {
                id
            },
            data: {
                isDeleted: true,
                deletedAt: new Date()
            }
        });
        return deletedLecture;
    }

    hardDeleteLecture = async (id: string) => {
        const deletedLecture = await prisma.lecture.delete({
            where: {
                id
            }
        });
        return deletedLecture;
    }
}