import prisma from '@models/prisma/prisma-client'

export class WishListDao {
    createWishList = async (wishListDto: WishlistDtoI) => {
        const wishList = prisma.wishList.create({
            // TODO valid Ids
            data: wishListDto
        })
        return wishList
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
            }
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
