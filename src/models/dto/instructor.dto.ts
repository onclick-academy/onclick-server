//instructor DTO
interface InstructorDtoI {
  id?: string | undefined
  userId: string
  nationalID: string
  cvLink: string
  averageRate: number | 0
}

export class InstructorDto {
  public id?: string | undefined
  public userId: string
  public nationalID: string
  public averageRate: number
  public cvLink: string

  constructor(bodyReq: InstructorDtoI) {
    this.id = bodyReq.id
    this.userId = bodyReq.userId
    this.nationalID = bodyReq.nationalID
    this.averageRate = bodyReq.averageRate
    this.cvLink = bodyReq.cvLink
  }
}
