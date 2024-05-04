export class BlockStateDto {
    public id: string
    public userId: string
    public adminId: string
    public state: boolean
    public reason: string
    public period: Date

    constructor(body: BlockStateDto) {
        this.id = body.id
        this.userId = body.userId
        this.adminId = body.adminId
        this.state = body.state
        this.reason = body.reason
        this.period = body.period
    }
}
