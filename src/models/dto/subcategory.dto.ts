import { SubCategoryDtoI } from '../../types/subCategory.interfaces'

export class SubCategoryDto {
    public id?: string | undefined
    public categoryId: string
    public name: string
    public courseId?: string
    public description: string
    public isDeleted: boolean
    public deletedAt: Date

    constructor(body: SubCategoryDtoI) {
        this.id = body.id
        this.categoryId = body.categoryId
        this.courseId = body.courseId
        this.name = body.name
        this.description = body.description
        this.isDeleted = body.isDeleted
        this.deletedAt = body.deletedAt
    }
}
