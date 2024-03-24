export class SectionDto {
  public id?: string
  public courseId: string
  public content: string
  public fullduration: string
  public isDeleted: boolean
  public deletedAt: Date

  constructor(body: SectionDtoI) {
    this.id = body.id
    this.courseId = body.courseId
    this.content = body.content
    this.fullduration = body.fullduration
    this.isDeleted = body.isDeleted
    this.deletedAt = body.deletedAt
  }
}
