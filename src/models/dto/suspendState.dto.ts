export class SuspendStateDto {
  public id: string
  public userId: string
  public adminId: string
  public isValid: boolean
  public reason: string
  public period: Date

  constructor(body: SuspendStateDtoI) {
    this.id = body.id
    this.userId = body.userId
    this.adminId = body.adminId
    this.isValid = body.isValid
    this.reason = body.reason
    this.period = body.period
  }
}
