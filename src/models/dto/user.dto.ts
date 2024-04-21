import { GENDER, ROLE } from '@prisma/client'

export class UserDto {
    public id: string
    public firstName: string
    public lastName: string
    public username: string
    public email: string
    public bio: string
    public password: string
    public phoneNum: string
    public profilePic?: string
    public birthDate: Date
    public gender?: GENDER
    public role?: ROLE
    public isEmailConfirm: boolean
    public isDeleted?: boolean
    public isRememberMe?: boolean

    constructor(bodyReq: UserDtoI) {
        this.id = bodyReq['id']
        this.firstName = bodyReq['firstName']
        this.lastName = bodyReq['lastName']
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
    }
}
