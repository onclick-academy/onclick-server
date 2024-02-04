export class lectureMaterialDto {
  readonly id: string
  readonly title: string
  readonly description: string
  readonly isDeleted: boolean
  readonly deletedAt: Date

  constructor(body: lectureMaterialI) {
    this.id = body.id
    this.title = body.title
    this.description = body.description
    this.isDeleted = body.isDeleted
    this.deletedAt = body.deletedAt
  }
}
