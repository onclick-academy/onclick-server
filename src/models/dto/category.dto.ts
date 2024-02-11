import { CategoryDtoI } from '../../types/category.interface';

export class CategoryDto {
    public id: string | undefined;
    public title: string;
    public description: string;
    public photo: string;
    public isDeleted: boolean;
    public deletedAt: Date;

constructor(bodyReq : CategoryDtoI) {
    this.id = bodyReq.id;
    this.title = bodyReq.title;
    this.description = bodyReq.description;
    this.photo = bodyReq.photo;
    this.isDeleted = bodyReq.isDeleted;
    this.deletedAt = bodyReq.deletedAt;
}
}