class RatingDto {
  targetType: 'COURSE' | 'INSTRUCTOR'
  targetId: string
  rate: number
  comment?: string
  userId: string
  courseId?: string

  constructor(bodyReq: RatingInterface) {
    this.targetType = bodyReq['targetType']
    this.targetId = bodyReq['targetId']
    this.rate = bodyReq['rate']
    this.comment = bodyReq['comment']
    this.userId = bodyReq['userId']
    this.courseId = bodyReq['courseId']
  }
}
