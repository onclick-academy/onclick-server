import prisma from '../prisma/prisma-client'
import { CategoryDtoI, CategoryUpdateI, GlobalCategoryI } from '../../types/category.interface'

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

  // getSubCategoriesByCategoryId = async (categoryId: string) => {
  //   const subCategories = await prisma.category.findMany({
  //     where: {
  //       id: categoryId,
  //       isDeleted: false
  //     },
  //     include: {
  //       subCategories: true
  //     }
  //   })
  //   return subCategories
  // }

  updateCategory = async (categoryDto: CategoryUpdateI) => {
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
