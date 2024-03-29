export class RatingDto {
  id: string | null
  targetType: 'COURSE' | 'INSTRUCTOR'
  targetId: string
  userId: string
  rate: number
  comment?: string
  courseId?: string
  instructorId?: string
  isDeleted: boolean | false

  constructor(bodyReq: RatingDtoI) {
    this.id = bodyReq['id']
    this.targetType = bodyReq['targetType']
    this.targetId = bodyReq['targetId']
    this.userId = bodyReq['userId']
    this.rate = bodyReq['rate']
    this.comment = bodyReq['comment']
    this.courseId = bodyReq['courseId']
    this.instructorId = bodyReq['instructorId']
    this.isDeleted = bodyReq['isDeleted']
  }
}
