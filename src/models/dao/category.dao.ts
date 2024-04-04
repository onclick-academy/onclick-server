import prisma from '../prisma/prisma-client'
import { CategoryDtoI, CategoryUpdateI } from '../../types/category.interface'

export class CategoryDao {
    createCategory = async (categoryDto: CategoryDtoI) => {
        const newCategory = await prisma.category.create({
            data: categoryDto
        })
        return newCategory
    }

    getAllCategories = async () => {
        const categories = await prisma.category.findMany({
            include: {
                subCategories: {
                    include: {
                        topics: true
                    }
                }
            }
        })
        return categories
    }

    getCategoryById = async (categoryId: string) => {
        const category = await prisma.category.findUnique({
            where: {
                id: categoryId,
                isDeleted: false
            }
        })
        return category
    }

    updateCategory = async (categoryDto: CategoryUpdateI) => {
        const updatedCategory = await prisma.category.update({
            where: {
                id: categoryDto.id,
                isDeleted: false
            },
            data: categoryDto
        })
        return updatedCategory
    }

    deleteCategory = async (categoryId: string) => {
        const deletedCategory = await prisma.category.update({
            where: {
                id: categoryId,
                isDeleted: false
            },
            data: {
                isDeleted: true,
                deletedAt: new Date()
            }
        })

        return deletedCategory
    }
}
