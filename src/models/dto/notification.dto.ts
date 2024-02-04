export class NotificationDto {
  id: string
  recipientId: string
  title: string
  message: string
  isRead: boolean
  constructor(bodyReq: NotificationDtoI) {
    this.id = bodyReq['id']
    this.recipientId = bodyReq['recipientId']
    this.title = bodyReq['title']
    this.message = bodyReq['message']
    this.isRead = bodyReq['isRead']
  }
}
