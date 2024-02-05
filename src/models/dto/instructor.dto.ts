//instructor DTO

export class InstructorDto {
  public userId: string
  public nationalID: string
  public averageRate: number
  public cvLink: string

  constructor(bodyReq: InstructorDtoI) {
    this.userId = bodyReq.userId
    this.nationalID = bodyReq.nationalID
    this.averageRate = bodyReq.averageRate
    this.cvLink = bodyReq.cvLink
  }
}
