export class BlockStateDto {
    readonly id: string
    readonly userId: string
    readonly adminId: string
    readonly state: boolean
    readonly reason: string
    readonly period: Date
  
    constructor(body: BlockStateDto) {
      this.id = body.id
      this.userId = body.userId
      this.adminId = body.adminId
      this.state = body.state
      this.reason = body.reason
      this.period = body.period
    }
  }