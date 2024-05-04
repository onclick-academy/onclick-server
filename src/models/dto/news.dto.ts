export class NewsDto {
    id: string
    adminId: string
    readonly title: string
    readonly subtitle: string
    readonly images: string[]
    readonly cover: string
    readonly description: string
    readonly isAvailable: boolean
    readonly isDeleted: boolean
    readonly deletedAt: Date

    constructor(body: NewsDtoI) {
        this.id = body.id
        this.adminId = body.adminId
        this.title = body.title
        this.subtitle = body.subtitle
        this.images = body.images
        this.cover = body.cover
        this.description = body.description
        this.isAvailable = body.isAvailable
        this.isDeleted = body.isDeleted
        this.deletedAt = body.deletedAt
    }
}
