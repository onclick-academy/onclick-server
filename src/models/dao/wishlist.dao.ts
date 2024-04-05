import prisma from '@models/prisma/prisma-client'

export class WishListDao {
    createWishList = async (wishListDto: WishlistDtoI) => {

        const wishList = await prisma.wishList.create({
            data: wishListDto
        })
        return wishList
    }

    isWishListed = async (wishListDto: WishlistDtoI) => {
        const wishList = await prisma.wishList.findFirst({
            where: {
                userId: wishListDto.userId,
                courseId: wishListDto.courseId
            }
        })
        console.log("from wishlist dao",wishList)
        if (!wishList) return false
        return wishList
    }

    getWishListById = async (wishListId: string) => {
        // TODO valid Ids
        const wishList = await prisma.wishList.findUnique({
            where: {
                id: wishListId
            }
        })
        return wishList
    }

    getWishListByUserId = async (userId: string) => {
        // TODO valid Ids
        const wishLists = await prisma.wishList.findMany({
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
                        subCategories: true,
                        publisher: {
                            include: {
                                user: true
                            }
                        },
                        ratings: true,
                        CourseOwners: true,
                        category: true
                    }
                }}
            })
        return wishLists
    }

    getWishListByCourseId = async (courseId: string) => {
        // TODO valid Ids
        const wishLists = await prisma.wishList.findMany({
            where: {
                courseId: courseId
            }
        })
        return wishLists
    }

    updateWishList = async (wishListUpdate: WishlistUpdateI) => {
        // TODO valid Ids
        const wishList = await prisma.wishList.update({
            where: {
                id: wishListUpdate.id
            },
            data: wishListUpdate
        })
        return wishList
    }

    deleteWishList = async (wishListId: string) => {
        // TODO valid Ids
        const wishList = await prisma.wishList.update({
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
