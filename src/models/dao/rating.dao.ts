import prisma from '../prisma/prisma-client'

export class RatingDao {
  createRating = async (ratingDto: RatingInterface) => {
    const rating = await prisma.rating.create({
      data: {
        userId: ratingDto.userId,
        targetType: ratingDto.targetType,
        targetId: ratingDto.targetId,
        rate: ratingDto.rate,
        comment: ratingDto.comment,
        courseId: ratingDto.courseId
      }
    })
    return rating
  }

  getRating = async (id: string) => {
    const rating = await prisma.rating.findFirst({
      where: {
        id: id
      }
    })
    return rating
  }

  updateRating = async (ratingDto: RatingInterface) => {
    const rating = await prisma.rating.update({
      where: {
        id: ratingDto.targetId
        
      },
      data: {
        userId: ratingDto.userId,
        targetType: ratingDto.targetType,
        targetId: ratingDto.targetId,
        rate: ratingDto.rate,
        comment: ratingDto.comment,
        courseId: ratingDto.courseId
      }
    })
    return rating
  }

  deleteRating = async (id: string) => {
    const rating = await prisma.rating.delete({
      where: {
        id: id
      }
    })
    return rating
  }
}
