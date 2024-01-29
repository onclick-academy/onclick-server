export class AdminDto {
    readonly id: string
    readonly firstName: string
    readonly lastName: string
    readonly email: string
    readonly password: string
    readonly profilePic: string
    readonly isDeleted: boolean
    readonly deletedAt: Date

    constructor(bodyReq: AdminInterface) {
        this.id = bodyReq['id']
        this.firstName = bodyReq['firstName']
        this.lastName = bodyReq['lastName']
        this.email = bodyReq['email']
        this.password = bodyReq['password']
        this.profilePic = bodyReq['profilePic']
        this.isDeleted = bodyReq['isDeleted']
        this.deletedAt = bodyReq['deletedAt']
    }
}