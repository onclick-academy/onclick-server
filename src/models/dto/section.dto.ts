export class SectionDto {
    public id?: string
    public courseId: string
    public isDeleted: boolean
    public deletedAt: Date
    public title: string

    constructor(body: SectionDtoI) {
        this.id = body.id
        this.courseId = body.courseId
        this.isDeleted = body.isDeleted
        this.deletedAt = body.deletedAt
        this.title = body.title
    }
}
