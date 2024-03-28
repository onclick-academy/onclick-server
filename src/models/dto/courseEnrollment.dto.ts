export class CourseEnrollmentDto {
    public courseId: string
    public userId: string
    public progress?: JSON

    constructor(bodyReq: CourseEnrollmentDtoI) {
        this.courseId = bodyReq.courseId
        this.userId = bodyReq.userId
        this.progress = bodyReq.progress
    }
}
