export class CategoryDto {
        readonly id: string;
        readonly name: string;
        readonly description: string;
        readonly isDeleted: boolean;
        readonly deletedAt: Date;
        
    constructor(bodyReq : CategoryDtoI) {
        this.id = bodyReq['id'];
        this.name = bodyReq['name'];
        this.description = bodyReq['description'];
        this.isDeleted = bodyReq['isDeleted'];
        this.deletedAt = bodyReq['deletedAt'];
    }
}