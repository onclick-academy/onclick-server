import Joi from 'joi'

export class WishlistValidation {
  private static baseSchema = {
    id: Joi.string().allow(null),
    courseId: Joi.string().required(),
    userId: Joi.string().required(),
    isDeleted: Joi.boolean().required().default(false),
    deletedAt: Joi.date().allow(null)
  }

  static createWishlist(wishListDto: WishlistDtoI) {
    return Joi.object(this.baseSchema).validateAsync(wishListDto)
  }

  static updateWishlist(wishListDto: WishlistUpdateI) {
    return Joi.object({
      ...this.baseSchema,
      isDeleted: Joi.boolean().required(),
      deletedAt: Joi.date().allow(null)
    }).validateAsync(wishListDto)
  }
}
