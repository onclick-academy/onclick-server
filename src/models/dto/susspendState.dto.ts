export class SusspendStateDto {
  readonly id: string
  readonly UserDtoId: string
  readonly adminId: string
  readonly isValid: boolean
  readonly reason: string
  readonly period: Date

  constructor(body: SusspendStateDto) {
    this.id = body.id
    this.UserDtoId = body.UserDtoId
    this.adminId = body.adminId
    this.isValid = body.isValid
    this.reason = body.reason
    this.period = body.period
  }
}
