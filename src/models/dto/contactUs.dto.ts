class ContactUsDto {
  name: string
  email: string
  message: string
  phone?: string | null
  isRead: boolean

  constructor(bodyReq: ContactUsInterface) {
    this.name = bodyReq['name']
    this.email = bodyReq['email']
    this.message = bodyReq['message']
    this.phone = bodyReq['phone']
    this.isRead = bodyReq['isRead']
  }
}

export default ContactUsDto
