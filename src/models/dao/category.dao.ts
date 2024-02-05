import prisma from "../prisma/prisma-client";

export class CategoryDao {
    createCategory = async (categoryDto: CategoryDtoI) => {
        const newCategory = await prisma.category.create({
            data: categoryDto
        }) as GlobalCategoryI
        return newCategory
    }
}