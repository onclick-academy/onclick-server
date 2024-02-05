import prisma from "../prisma/prisma-client";

export class SubCategoryDao {
    createSubCategory = async (categoryDto: SubCategoryDtoI) => {
        const newCategory = await prisma.subCategory.create({
            data: categoryDto
        }) as GlobalSubCategoryI
        return newCategory
    }
}

