interface ContactUsDtoI {
    id: string
    name: string
    email: string
    message: string
    phone?: string | null
    isRead: boolean
}

export class ContactUsDto {
    public id: string
    public name: string
    public email: string
    public message: string
    public phone?: string | null
    public isRead: boolean

    constructor(bodyReq: ContactUsDtoI) {
        this.id = bodyReq['id']
        this.name = bodyReq['name']
        this.email = bodyReq['email']
        this.message = bodyReq['message']
        this.phone = bodyReq['phone']
        this.isRead = bodyReq['isRead']
    }
}
