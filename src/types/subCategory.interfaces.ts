export interface SubCategoryDtoI {
  id?: string
  categoryId: string
  name: string
  description: string
  isDeleted: boolean
  deletedAt: Date
}

export interface SubCategoryUpdateI {
  id?: string
  categoryId: string
  name?: string
  description?: string
  isDeleted?: boolean
  deletedAt?: Date
}

export interface GlobalSubCategoryI {
  id: string
  createdAt: Date
  updatedAt: Date

  categoryId: string
  name: string
  description: string
  isDeleted: boolean
  deletedAt: Date | null
}
