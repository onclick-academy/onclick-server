import  express from "express";
import { WishlistController } from "../controllers/wishlist.controller";

const router = express.Router();

router
    .route("/")
    .post(WishlistController.createWishList)
    .get(WishlistController.getWishListByUserId)


router
    .route("/:courseId")
    .post(WishlistController.isWishListed)

router
    .route("/:wishListId")
    .get(WishlistController.getWishListById)
    .put(WishlistController.updateWishList)
    .delete(WishlistController.deleteWishList);


export default router;