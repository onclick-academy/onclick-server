class EventsDto {
  adminId: string
  title: string
  description: string
  startDate: Date
  endDate: Date
  isDeleted: boolean
  deletedAt?: Date
  isAvailable: boolean
  cover: string
  images?: string[]

  constructor(bodyReq: EventsInterface) {
    this.adminId = bodyReq['adminId']
    this.title = bodyReq['title']
    this.description = bodyReq['description']
    this.startDate = bodyReq['startDate']
    this.endDate = bodyReq['endDate']
    this.isDeleted = bodyReq['isDeleted']
    this.deletedAt = bodyReq['deletedAt']
    this.isAvailable = bodyReq['isAvailable']
    this.cover = bodyReq['cover']
    this.images = bodyReq['images']
  }
}
