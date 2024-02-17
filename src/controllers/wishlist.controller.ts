import { WishListDao } from "@models/dao/wishlist.dao";
import { WishlistDto } from "@models/dto/whishlist.dto";
import { WishlistValidation } from "@middlewares/validation/whishlist.validation";
import { Request, Response } from "express";

export class WishlistController {
    static createWishList = async (req: any, res: Response) => {
        const wishListDao = new WishListDao();
        const wishListDto = new WishlistDto(req.body);
        wishListDto.userId = req.user.id;
        try {

            const { error } = await WishlistValidation.createWishlist(wishListDto);
            if (error) return res.status(400).json({ message: error.message });
            const wishList = await wishListDao.createWishList(wishListDto);
            return res.status(201).json({ message: "Wishlist created successfully", data: wishList });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: error }); // error.message
        }
    }

    static getWishListById = async (req: Request, res: Response) => {
        const wishListId = req.params.wishListId;
        const wishListDao = new WishListDao();

        try {
            const wishList = await wishListDao.getWishListById(wishListId);
            return res.status(200).json({ message: "Wishlist fetched successfully", data: wishList });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: error }); // error.message
        }
    }

    static getWishListByUserId = async (req: any, res: Response) => {
        const userId = req.user.id;
        const wishListDao = new WishListDao();

        try {
            const wishLists = await wishListDao.getWishListByUserId(userId);
            return res.status(200).json({ message: "Wishlists fetched successfully", data: wishLists });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: error }); // error.message
        }
    }

    // TODO => ROUTE discussion
    static getWishListByCourseId = async (req: Request, res: Response) => {
        const courseId = req.body.courseId;
        const wishListDao = new WishListDao();
        try {
            const wishLists = await wishListDao.getWishListByCourseId(courseId);
            return res.status(200).json({ message: "Wishlists fetched successfully", data: wishLists });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: error }); // error.message
        }
    }

    static updateWishList = async (req: Request, res: Response) => {
        const wishListDto = new WishlistDto(req.body);
        const wishListDao = new WishListDao();

        wishListDto.id = req.params.wishListId; // TODO body?

        try {
            const wishList = await wishListDao.updateWishList(wishListDto);
            return res.status(200).json({ message: "Wishlist updated successfully", data: wishList });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: error }); // error.message
        }
    }

    static deleteWishList = async (req: Request, res: Response) => {
        const wishListId = req.params.wishListId;
        const wishListDao = new WishListDao();
        try {
            const wishList = await wishListDao.deleteWishList(wishListId);
            return res.status(200).json({ message: "Wishlist deleted successfully", data: wishList });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: error }); // error.message
        }
    }
}