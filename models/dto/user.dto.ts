export class UserDto implements UserInterface{

  constructor(bodyReq) {
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
    // super()
  }
}
