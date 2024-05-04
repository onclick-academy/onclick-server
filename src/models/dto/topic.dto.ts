export class TopicDto {
    public id?: string
    public title: string
    public isDeleted: boolean
    public deletedAt: Date

    constructor(bodyReq: TopicDtoI) {
        this.id = bodyReq['id']
        this.title = bodyReq['title']
        this.isDeleted = bodyReq['isDeleted']
        this.deletedAt = bodyReq['deletedAt']
    }
}
