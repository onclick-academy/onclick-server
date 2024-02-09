export class StudentDto {

  public userId: string

  constructor(bodyReq: StudentDtoI) {
    this.userId = bodyReq.userId
  }
}
