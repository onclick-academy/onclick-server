class CourseDto {
  adminId: string
  categoryId: string
  subCategoryId: string
  title: string
  description: string
  price: number
  rate?: number
  discount?: number
  isAvailable: boolean
  skillsGained: string[]
  duration: string
  photoUrl: string
  isDeleted: boolean
  deletedAt?: Date
  certifiacteUrl: string
  introVideoUrl?: string

  constructor(bodyReq: CourseInterface) {
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
    this.photoUrl = bodyReq['photoUrl']
    this.isDeleted = bodyReq['isDeleted']
    this.deletedAt = bodyReq['deletedAt']
    this.certifiacteUrl = bodyReq['certifiacteUrl']
    this.introVideoUrl = bodyReq['introVideoUrl']
  }
}
