import { EDUCATION_LEVEL } from "@prisma/client"

export class StudentDto {

  public userId: string
  public educationLevel: EDUCATION_LEVEL

  constructor(bodyReq: StudentDtoI) {
    this.userId = bodyReq.userId
    this.educationLevel = bodyReq.educationLevel
  }
}
