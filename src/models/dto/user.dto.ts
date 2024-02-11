import { GENDER, ROLE, EDUCATION_LEVEL } from "@prisma/client"

export class UserDto {
  public id: string
  public fullName: string
  public username: string
  public email: string
  public bio: string
  public password: string
  public phoneNum: string
  public profilePic?: string
  public birthDate: Date
  public gender: GENDER
  public role: ROLE
  public educationLevel: EDUCATION_LEVEL
  public isEmailConfirm: boolean

  constructor(bodyReq: any) {
    this.id = bodyReq['id']
    this.fullName = bodyReq['fullName']
    this.username = bodyReq['username']
    this.email = bodyReq['email']
    this.bio = bodyReq['bio']
    this.password = bodyReq['password']
    this.phoneNum = bodyReq['phoneNum']
    this.profilePic = bodyReq['profilePic']
    this.birthDate = bodyReq['birthDate']
    this.gender = bodyReq['gender']
    this.educationLevel = bodyReq['educationLevel']
    this.role = bodyReq['role']
    this.isEmailConfirm = bodyReq['isEmailConfirm']
  }
}
