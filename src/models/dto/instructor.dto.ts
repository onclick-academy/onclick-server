//instructor DTO

export class InstructorDto {
  readonly id: string
  readonly instructorId: string
  readonly nationalId: string
  readonly avgRate: number
  readonly CvLink: string

  constructor(bodyReq: InstructorDtoI) {
    this.id = bodyReq['id']
    this.instructorId = bodyReq['instructorId']
    this.nationalId = bodyReq['nationalId']
    this.avgRate = bodyReq['avgRate']
    this.CvLink = bodyReq['CvLink']
  }
}
