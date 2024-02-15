export class LectureContentDto {
  public id?: string | undefined
  public lectureId: string
  public order: number
  public content: string
  public isDeleted: boolean
  public deletedAt: Date

  constructor(body: LectureContentDto) {
    this.id = body.id
    this.lectureId = body.lectureId
    this.order = body.order
    this.content = body.content
    this.isDeleted = body.isDeleted
    this.deletedAt = body.deletedAt
  }
}
