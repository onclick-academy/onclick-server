import { Request, Response } from 'express'
import FileService from '../services/FileService'
import { UserRequest } from 'types/user.interface'

class FileController {
    private fileService: FileService

    uploadSingleFile = async (req: UserRequest, res: Response): Promise<void> => {
        try {
            const file = req.file
            console.log('🚀 ~ FileController ~ uploadSingleFile= ~ file:', file)
            if (!file) {
                res.status(400).json({ message: 'No file uploaded' })
                return
            }

            const { id } = req.user
            const { sectionId, courseId, lectureId } = req.body

            this.fileService = new FileService(true, {
                userId: id,
                sectionId: sectionId || 'sectionId',
                courseId: courseId || 'courseId',
                lectureId: lectureId || 'lectureId'
            })
            const uploadedFile = await this.fileService.uploadFile(file.buffer, file.originalname, file.mimetype)
            res.status(200).json({ message: 'File uploaded successfully', data: uploadedFile })
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }

    uploadMultipleFiles = async (req: Request, res: Response): Promise<void> => {
        try {
            const files = req.files as any[]
            const uploadedFiles = await this.fileService.uploadFiles(files)
            res.status(200).json(uploadedFiles)
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }

    // TODO Implement others CRUD operations
}

export default new FileController()
