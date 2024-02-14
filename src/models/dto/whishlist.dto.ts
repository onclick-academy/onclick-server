export class WishlistDto {
  public id: string
  public userId: string
  public courseId: string
  public isDeleted: boolean
  public deletedAt: Date

  constructor(bodyReq: WishlistDtoI) {
    this.id = bodyReq['id']
    this.userId = bodyReq['userId']
    this.courseId = bodyReq['courseId']
    this.isDeleted = bodyReq['isDeleted']
    this.deletedAt = bodyReq['deletedAt']
  }
}
