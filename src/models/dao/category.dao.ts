import prisma from '../prisma/prisma-client'

export class CategoryDao {
  createCategory = async (categoryDto: CategoryDtoI) => {
    const newCategory = (await prisma.category.create({
      data: categoryDto
    })) as GlobalCategoryI
    return newCategory
  }

  getAllCategories = async () => {
    const categories = await prisma.category.findMany()
    return categories
  }

  getCategoryById = async (categoryId: string) => {
    const category = (await prisma.category.findUnique({
      where: {
        id: categoryId,
        isDeleted: false
      }
    })) as GlobalCategoryI
    return category
  }

  updateCategory = async (categoryDto: GlobalCategoryI) => {
    const updatedCategory = (await prisma.category.update({
      where: {
        id: categoryDto.id,
        isDeleted: false
      },
      data: categoryDto
    })) as GlobalCategoryI
    return updatedCategory
  }

  deleteCategory = async (categoryId: string) => {
    const deletedCategory = (await prisma.category.update({
      where: {
        id: categoryId,
        isDeleted: false
      },
      data: {
        isDeleted: true,
        deletedAt: new Date()
      }
    })) as GlobalCategoryI

    return deletedCategory
  }
}
