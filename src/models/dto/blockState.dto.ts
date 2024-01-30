export class BlockStateDto {
  readonly id: string
  readonly UserDtoId: string
  readonly adminId: string
  readonly state: boolean
  readonly reason: string
  readonly period: Date

  constructor(body: BlockStateDto) {
    this.id = body.id
    this.UserDtoId = body.UserDtoId
    this.adminId = body.adminId
    this.state = body.state
    this.reason = body.reason
    this.period = body.period
  }
}
