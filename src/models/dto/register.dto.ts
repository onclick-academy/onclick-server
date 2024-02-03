export class RegisterDto {
  // [key: string]: UserDtoI[keyof UserDtoI]
  // TODO find another weay to devcalre typess - all attributes have "any" type
  public id: string
  public fullName: string
  public username: string
  public email: string
  public bio: string
  public password: string
  public phoneNum: string
  public profilePic?: string
  public birthDate: Date
  public gender: string
  public role: string
  public isEmailConfirm: boolean
  public isDeleted?: boolean

  constructor(bodyReq: UserDtoI) {
    this.fullName = bodyReq['fullName']
    this.username = bodyReq['username']
    this.email = bodyReq['email']
    this.bio = bodyReq['bio']
    this.password = bodyReq['password']
    this.phoneNum = bodyReq['phoneNum']
    this.profilePic = bodyReq['profilePic']
    this.birthDate = bodyReq['birthDate']
    this.gender = bodyReq['gender']
    this.role = bodyReq['role']
    this.isEmailConfirm = bodyReq['isEmailConfirm']
    this.isDeleted = bodyReq['isDeleted']
  }
}
