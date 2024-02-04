export class studentDto {
  readonly id: string
  readonly studentId: string
  readonly educationLevel: string

  constructor(bodyReq: StudentDtoI) {
    this.id = bodyReq['id']
    this.studentId = bodyReq['studentId']
    this.educationLevel = bodyReq['educationLevel']
  }
}
