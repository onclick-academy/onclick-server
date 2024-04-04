import prisma from '@models/prisma/prisma-client'

export class WishListDao {
    createWishList = async (wishListDto: WishlistDtoI) => {
        const wishList = prisma.wishList.create({
            data: wishListDto
        })
        return wishList
    }

    isWishListed = async (wishListDto: WishlistDtoI) => {
        const wishList = prisma.wishList.findFirst({
            where: {
                userId: wishListDto.userId,
                courseId: wishListDto.courseId
            }
        })
        if (!wishList) return false
        return true
    }

    getWishListById = async (wishListId: string) => {
        // TODO valid Ids
        const wishList = prisma.wishList.findUnique({
            where: {
                id: wishListId
            }
        })
        return wishList
    }

    getWishListByUserId = (userId: string) => {
        // TODO valid Ids
        const wishLists = prisma.wishList.findMany({
            where: {
                userId: userId
            },
            include: {
                course: {
                    include: {
                        topics: {
                            include: {
                                topic: true
                            }
                        },
                        sections: {
                            include: {
                                lectures: true
                            }
                        },
                        enrollments: true,
                        subCategory: true,
                        publisher: {
                            include: {
                                user: true
                            }
                        },
                        ratings: true,
                        CourseOwners: true,
                    }
                }}
            })
        return wishLists
    }

    getWishListByCourseId = async (courseId: string) => {
        // TODO valid Ids
        const wishLists = prisma.wishList.findMany({
            where: {
                courseId: courseId
            }
        })
        return wishLists
    }

    updateWishList = (wishListUpdate: WishlistUpdateI) => {
        // TODO valid Ids
        const wishList = prisma.wishList.update({
            where: {
                id: wishListUpdate.id
            },
            data: wishListUpdate
        })
        return wishList
    }

    deleteWishList = (wishListId: string) => {
        // TODO valid Ids
        const wishList = prisma.wishList.update({
            where: {
                id: wishListId
            },
            data: {
                isDeleted: true,
                deletedAt: new Date()
            }
        })
        return wishList
    }
}
