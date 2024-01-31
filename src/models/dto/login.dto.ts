export class LoginDto {
  public email: string
  public password: string
  public username: string
  public role?: string
  public id?: string

  constructor(bodyReq: loginDtoI) {
    this.email = bodyReq['email']
    this.password = bodyReq['password']
    this.username = bodyReq['username']
    
  }
}
