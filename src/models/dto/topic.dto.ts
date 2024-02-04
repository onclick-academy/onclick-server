class TopicDto {
  title: string
  isDeleted: boolean
  deletedAt: Date

  constructor(bodyReq: TopicInterface) {
    this.title = bodyReq['title']
    this.isDeleted = bodyReq['isDeleted']
    this.deletedAt = bodyReq['deletedAt']
  }
}
