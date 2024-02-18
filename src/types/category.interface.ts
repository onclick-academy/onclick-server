export interface CategoryDtoI {
    id?: string | undefined
    title: string
    description: string
    photo: string
    isDeleted: boolean
    deletedAt: Date
}

export interface CategoryUpdateI {
    id?: string
    title?: string
    description?: string
    photo?: string
    isDeleted?: boolean
    deletedAt?: Date
}
