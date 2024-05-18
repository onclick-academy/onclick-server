import FilesController from '@controllers/files.controller'
import express from 'express'
import { upload } from '@middlewares/upload'

const router = express.Router()

router.route('/single/:courseId/:sectionId/:lectureId').post(upload.single('file'), FilesController.uploadSingleFile)

export default router
