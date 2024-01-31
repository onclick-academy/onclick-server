export class WhishlistDto {
  readonly id: string
  readonly studentId: string
  readonly courseId: string
  readonly isDeleted: boolean
  readonly deletedAt: Date
  
  constructor(bodyReq: WishlistDtoI) {
    this.id = bodyReq['id']
    this.studentId = bodyReq['studentId']
    this.courseId = bodyReq['courseId']
    this.isDeleted = bodyReq['isDeleted']
    this.deletedAt = bodyReq['deletedAt']
  }
}
