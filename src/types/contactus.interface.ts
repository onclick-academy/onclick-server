export interface ContactUsDtoI {
    id: string
    name: string
    email: string
    message: string
    phone?: string | null
    isRead: boolean
}
