export class LectureDto {
    public id?: string | undefined
    public sectionId: string
    public order: number
    public title: string
    public description: string
    // public videoUrl: string
    public duration: string
    public thumbnail: string
    public isDeleted: boolean
    public deletedAt: Date

    constructor(body: LectureDto) {
        this.id = body.id
        this.sectionId = body.sectionId
        this.order = body.order
        this.title = body.title
        this.description = body.description
        // this.videoUrl = body.videoUrl
        this.duration = body.duration
        this.thumbnail = body.thumbnail
        this.isDeleted = body.isDeleted
        this.deletedAt = body.deletedAt
    }
}
