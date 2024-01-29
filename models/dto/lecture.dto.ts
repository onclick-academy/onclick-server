export class LectureDto {
  readonly id: string
  readonly courseId: string
  readonly title: string
  readonly description: string
  readonly videoUrl: string
  readonly duration: string
  readonly isDeleted: boolean
  readonly deletedAt: Date

  constructor(body: LectureInterface) {
    this.id = body.id
    this.courseId = body.courseId
    this.title = body.title
    this.description = body.description
    this.videoUrl = body.videoUrl
    this.duration = body.duration
    this.isDeleted = body.isDeleted
    this.deletedAt = body.deletedAt
  }
}
