export class lectureMaterialDto {
    public id: string
    public lectureContentId: string
    public title: string
    public description: string
    public isDeleted: boolean
    public deletedAt: Date

    constructor(body: lectureMaterialI) {
        this.id = body.id
        this.lectureContentId = body.lectureContentId
        this.title = body.title
        this.description = body.description
        this.isDeleted = body.isDeleted
        this.deletedAt = body.deletedAt
    }
}
