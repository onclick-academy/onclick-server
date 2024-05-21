import FilesController from '@controllers/files.controller'
import express from 'express'
import { upload } from '@middlewares/upload'
import { CourseMiddleware } from '@middlewares/course.middleware'

const { validateHeaders, validateCourse, validateEnrollment } = CourseMiddleware

const router = express.Router()

router.use(validateHeaders)

router
    .route('/single/:courseId/:sectionId/:lectureId')
    .post(validateCourse, upload.single('file'), FilesController.uploadSingleFile)
    .get(validateCourse, validateEnrollment, FilesController.getFile)

export default router
