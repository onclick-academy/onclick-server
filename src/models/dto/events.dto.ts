class EventsDto {
  public id: string | undefined
  public adminId: string
  public title: string
  public subtitle: string
  public description: string
  public images?: string[]
  public startDate: Date
  public endDate: Date
  public isDeleted: boolean
  public deletedAt?: Date
  public isAvailable: boolean
  public cover: string

  constructor(bodyReq: EventDtoI) {
    this.id = bodyReq['id']
    this.adminId = bodyReq['adminId']
    this.title = bodyReq['title']
    this.subtitle = bodyReq['subtitle']
    this.description = bodyReq['description']
    this.images = bodyReq['images']
    this.startDate = bodyReq['startDate']
    this.endDate = bodyReq['endDate']
    this.isDeleted = bodyReq['isDeleted']
    this.deletedAt = bodyReq['deletedAt']
    this.isAvailable = bodyReq['isAvailable']
    this.cover = bodyReq['cover']
  }
}
