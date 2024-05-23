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

            const { id: userId } = req.user
            const { sectionId, courseId, lectureId } = req.params
            this.fileService = new FileService(`${userId}/${courseId}/${sectionId}/${lectureId}`)

            const uploadedFile = await this.fileService.putFile(file)
            res.status(200).json({ message: 'File uploaded successfully', data: uploadedFile })
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }

    getFile = async (req: Request, res: Response): Promise<void> => {
        try {
            const { courseId, sectionId, lectureId } = req.params
            const { id: userId } = (req as UserRequest).user

            this.fileService = new FileService(`${userId}/${courseId}/${sectionId}/${lectureId}`)
            const file = await this.fileService.getFile()
            res.status(200).json({ message: 'File retrieved successfully', data: file })
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }
}

export default new FileController()
