export class UserDto {
  // [key: string]: UserInterface[keyof UserInterface]
  // TODO find another weay to devcalre typess - all attributes have "any" type
  readonly id: string
  readonly fullName: string
  readonly username: string
  readonly email: string
  readonly bio: string
  readonly password: string
  readonly phoneNum: string
  readonly profilePic: string
  readonly birthDate: Date
  readonly gender: string
  readonly role: string
  readonly isEmailConfirmed: boolean

  constructor(bodyReq: UserInterface) {
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
    this.role = bodyReq['role']
    this.isEmailConfirmed = bodyReq['isEmailConfirmed']
  }
}
