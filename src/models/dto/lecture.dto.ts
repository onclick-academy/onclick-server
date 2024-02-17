export class LectureDto {
  public id?: string
  public courseId: string
  public title: string
  public description: string
  public videoUrl: string
  public duration: string
  public isDeleted: boolean
  public deletedAt: Date

  constructor(body: LectureDtoI) {
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
