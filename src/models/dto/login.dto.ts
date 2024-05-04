export class LoginDto {
    public email: string | undefined
    public password: string | undefined
    public username: string | undefined
    public role?: string
    public id?: string
    public isRememberMe?: boolean

    constructor(bodyReq: loginDtoI) {
        this.email = bodyReq['email']
        this.password = bodyReq['password']
        this.username = bodyReq['username']
        this.isRememberMe = bodyReq['isRememberMe']
    }
}
