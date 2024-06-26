import { SubCategoryDtoI, SubCategoryUpdateI } from '../../types/subCategory.interfaces'
import prisma from '@models/prisma/prisma-client'

export class SubCategoryDao {
    createSubCategory = async (categoryDto: SubCategoryDtoI) => {
        const newSubCategory = await prisma.subCategory.create({
            data: categoryDto
        })

        return newSubCategory
    }

    getAllSubCategories = async () => {
        const subCategories = await prisma.subCategory.findMany({
            where: {
                isDeleted: false
            }
        })

        return subCategories
    }

    getSubCategoryById = async (categoryId: string) => {
        const subCategory = await prisma.subCategory.findUnique({
            where: {
                id: categoryId,
                isDeleted: false
            }
        })
        return subCategory
    }

    // linkTopicsToSubCategory = async (subCategoryDto: { id: string; topicIds: string[] }) => {
    //     let newSubCategoryTopics = []
    //     for (let id of subCategoryDto.topicIds) {
    //         const newSubCategoryTopic = await prisma.subCategoryTopic.create({
    //             data: {
    //                 subCategoryId: subCategoryDto.id,
    //                 topicId: id
    //             }
    //         })
    //         newSubCategoryTopics.push(newSubCategoryTopic)
    //     }
    //     return newSubCategoryTopics
    // }

    getSubCategoryByCategoryId = async (categoryId: string) => {
        // console.log('categoryId', categoryId)
        const subCategories = await prisma.subCategory.findMany({
            where: {
                categoryId: categoryId,
                isDeleted: false
            }
        })
        return subCategories
    }

    updateSubCategory = async (subCategoryDto: SubCategoryUpdateI) => {
        const updatedSubCategory = await prisma.subCategory.update({
            where: {
                id: subCategoryDto.id,
                isDeleted: false
            },
            data: subCategoryDto
        })
        return updatedSubCategory
    }

    deleteSubCategory = async (categoryId: string) => {
        const deletedSubCategory = await prisma.subCategory.update({
            where: {
                id: categoryId,
                isDeleted: false
            },
            data: {
                isDeleted: true,
                deletedAt: new Date()
            }
        })
        return deletedSubCategory
    }
}
