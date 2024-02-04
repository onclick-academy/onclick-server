export class LectureContentDto {
  readonly id: string
  readonly lectureId: string
  readonly materialId: string
  readonly order: number
  readonly content: string
  readonly isDeleted: boolean
  readonly deletedAt: Date

  constructor(body: LectureContentDto) {
    this.id = body.id
    this.lectureId = body.lectureId
    this.materialId = body.materialId
    this.order = body.order
    this.content = body.content
    this.isDeleted = body.isDeleted
    this.deletedAt = body.deletedAt
  }
}
