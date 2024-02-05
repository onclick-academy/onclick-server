export class SubCategoryDto {
  public categoryId: string
  public name: string
  public description: string
  public isDeleted: boolean
  public deletedAt: Date

  constructor(body: SubCategoryDtoI) {
    this.categoryId = body.categoryId
    this.name = body.name
    this.description = body.description
    this.isDeleted = body.isDeleted
    this.deletedAt = body.deletedAt
  }
}
