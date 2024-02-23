export class CourseDto {
    public id: string | undefined
    public instructorId: string
    public adminId: string
    public categoryId: string
    public subCategoryId: string
    public title: string
    public description: string
    public price: number
    public rate?: number
    public discount?: number
    public isAvailable: boolean
    public skillsGained: string[]
    public duration: string
    public photo: string
    public isDeleted: boolean
    public deletedAt?: Date
    public certificate: string
    public introVideo?: string
    public isApproved?: boolean
    public topicIds: string[]
    public createdBy: string;
    

    constructor(bodyReq: CourseDtoI) {
        this.id = bodyReq['id']
        this.instructorId = bodyReq['instructorId']
        this.adminId = bodyReq['adminId']
        this.categoryId = bodyReq['categoryId']
        this.subCategoryId = bodyReq['subCategoryId']
        this.title = bodyReq['title']
        this.description = bodyReq['description']
        this.price = bodyReq['price']
        this.rate = bodyReq['rate']
        this.discount = bodyReq['discount']
        this.isAvailable = bodyReq['isAvailable']
        this.skillsGained = bodyReq['skillsGained']
        this.duration = bodyReq['duration']
        this.photo = bodyReq['photo']
        this.isDeleted = bodyReq['isDeleted']
        this.deletedAt = bodyReq['deletedAt']
        this.certificate = bodyReq['certificate']
        this.introVideo = bodyReq['introVideo']
        this.isApproved = bodyReq['isApproved']
        this.topicIds = bodyReq['topicIds']
        this.createdBy = bodyReq['createdBy']
    
    }
}
