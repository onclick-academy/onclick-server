import prisma from '@models/prisma/prisma-client.js'

export class RatingDao {
    createRating = async (ratingDto: RatingDtoI) => {
        const rating = await prisma.rating.create({
            data: ratingDto
        })
        return rating
    }

    updateRating = async (ratingDto: RatingUpdateDtoI) => {
        const rating = await prisma.rating.update({
            where: {
                id: ratingDto.id
            },
            data: ratingDto
        })
        return rating
    }

    deleteRating = async (ratingId: string) => {
        const rating = await prisma.rating.update({
            where: {
                id: ratingId
            },
            data: {
                isDeleted: true
            }
        })
        return rating
    }

    getRatingById = async (ratingId: string) => {
        const rating = await prisma.rating.findUnique({
            where: {
                id: ratingId
            }
        })
        if (!rating) throw new Error('Rating not found')
        return rating
    }

    getUserRating = async (userId: string) => {
        const rating = await prisma.rating.findMany({
            where: {
                userId
            }
        })
        return rating
    }

    getCourseRating = async (courseId: string) => {
        const rating = await prisma.rating.findMany({
            where: {
                courseId
            }
        })
        return rating
    }

    getInstructorRating = async (instructorId: string) => {
        const rating = await prisma.rating.findMany({
            where: {
                instructorId
            }
        })
        return rating
    }
}
