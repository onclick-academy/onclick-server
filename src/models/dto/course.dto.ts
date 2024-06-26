export class CourseDto {
    public id: string | undefined
    public adminId: string
    public categoryId: string
    public title: string
    public description: string
    public price: number
    public rate?: number
    public discount?: number
    public isAvailable: boolean
    public duration: string
    public photo: string
    public isDeleted: boolean
    public deletedAt?: Date
    public certificate: string
    public introVideo?: string
    public isApproved?: boolean
    public topics: string[]
    public CourseOwners : string[]
    public subCategories: string[]

    constructor(bodyReq: CourseDtoI) {
        this.id = bodyReq['id']
        this.adminId = bodyReq['adminId']
        this.categoryId = bodyReq['categoryId']
        this.title = bodyReq['title']
        this.description = bodyReq['description']
        this.price = bodyReq['price']
        this.rate = bodyReq['rate']
        this.discount = bodyReq['discount']
        this.isAvailable = bodyReq['isAvailable']
        this.photo = bodyReq['photo']
        this.isDeleted = bodyReq['isDeleted']
        this.deletedAt = bodyReq['deletedAt']
        this.certificate = bodyReq['certificate']
        this.introVideo = bodyReq['introVideo']
        this.isApproved = bodyReq['isApproved']
        this.topics = bodyReq['topics']
        this.CourseOwners = bodyReq['CourseOwners']
        this.subCategories = bodyReq['subCategories']
    }
}
