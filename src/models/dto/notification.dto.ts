import { NOTIFICATION_TYPE } from '@prisma/client'

export class NotificationDto {
  id: string
  recipientId: string
  title: string
  message?: string
  isRead: boolean
  type: NOTIFICATION_TYPE
  additionalInfo?: JSON

  constructor(bodyReq: NotificationDtoI) {
    this.id = bodyReq['id']
    this.recipientId = bodyReq['recipientId']
    this.title = bodyReq['title']
    this.message = bodyReq['message']
    this.isRead = bodyReq['isRead']
    this.type = bodyReq['type']
    this.additionalInfo = bodyReq['additionalInfo']
  }
}
