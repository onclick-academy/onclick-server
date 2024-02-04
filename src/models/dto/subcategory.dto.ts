export class subCategoryDto {
  readonly id: string
  readonly name: string
  readonly description: string
  readonly isDeleted: boolean
  readonly deletedAt: Date

  constructor(body: SubCategoryI) {
    this.id = body.id
    this.name = body.name
    this.description = body.description
    this.isDeleted = body.isDeleted
    this.deletedAt = body.deletedAt
  }
}
