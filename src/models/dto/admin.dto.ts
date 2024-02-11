export class AdminDto {
    public id: string | undefined
    public firstName: string
    public lastName: string
    public email: string
    public password: string
    public profilePic: string
    public isDeleted: boolean
    public deletedAt: Date
    public isEmailConfirm: boolean
  
    constructor(bodyReq: {
      id: string | undefined
      firstName: string
      lastName: string
      email: string
      password: string
      profilePic: string
      isDeleted: boolean
      deletedAt: Date
      isEmailConfirm: boolean
    }) {
      this.id = bodyReq.id
      this.firstName = bodyReq.firstName
      this.lastName = bodyReq.lastName
      this.email = bodyReq.email
      this.password = bodyReq.password
      this.profilePic = bodyReq.profilePic
      this.isDeleted = bodyReq.isDeleted
      this.deletedAt = bodyReq.deletedAt
      this.isEmailConfirm = bodyReq.isEmailConfirm
    }
  }
  