export class TopicDto {
  public title: string
  public isDeleted: boolean
  public deletedAt: Date

  constructor(bodyReq: TopicDtoI) {
    this.title = bodyReq['title']
    this.isDeleted = bodyReq['isDeleted']
    this.deletedAt = bodyReq['deletedAt']
  }
}
