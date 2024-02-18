import { LectureContentDto } from '@models/dto/lectureContent.dto'
import { LectureContentDao } from '@models/dao/lectureContent.dao'
import { lecturesContentValidation } from '@middlewares/validation/course/lecturesContent.validation'
import { LectureContentIdValidation, LectureIdValidation } from '@utilities/IdValidation/coursePackage.id'

export class LectureContentController {
    static createLectureContent = async (req: any, res: any) => {
        const lectureContentDto = new LectureContentDto(req.body)
        const lectureContentDao = new LectureContentDao()
        try {

            await LectureIdValidation(lectureContentDto.lectureId)

            const { error } = await lecturesContentValidation.createLecturesContent(lectureContentDto)
            if (error) return res.status(400).json({ message: error.message })

            const lectureContent = await lectureContentDao.createLectureContent(lectureContentDto)
            return res.status(201).json({ message: 'Lecture content created successfully', data: lectureContent })
        } catch (error: any) {
            console.log(error)
            return res.status(500).json({ error: error.message || 'Internal server error' })
        }
    }

    static getLectureContentByLectureId = async (req: any, res: any) => {
        const lectureContentDao = new LectureContentDao()
        try {

            await LectureIdValidation(req.body.lectureId)

            const lectureContent = await lectureContentDao.getLectureContentByLictureId(req.body.lectureId)
            return res.status(200).json({ data: lectureContent })
        } catch (error: any) {
            console.log(error)
            return res.status(500).json({ error: error.message || 'Internal server error' })
        }
    }

    static getLectureContentById = async (req: any, res: any) => {
        const lectureContentDao = new LectureContentDao()
        try {
            const lectureContent = await lectureContentDao.getLectureContentById(req.body.id)
            return res.status(200).json({ data: lectureContent })
        } catch (error: any) {
            console.log(error)
            return res.status(500).json({ error: error.message || 'Internal server error' })
        }
    }

    static updateLectureContent = async (req: any, res: any) => {
        const lectureContentDto = new LectureContentDto(req.body)
        const lectureContentDao = new LectureContentDao()
        try {

            let id = req.body.id

            await LectureIdValidation(lectureContentDto.lectureId)
            await LectureContentIdValidation(id)

            const { error } = await lecturesContentValidation.updateLecturesContent(lectureContentDto)
            if (error) return res.status(400).json({ message: error.message })

            const lectureContent = await lectureContentDao.updateLectureContent(lectureContentDto)
            return res.status(200).json({ message: 'Lecture content updated successfully', data: lectureContent })
        } catch (error: any) {
            console.log(error)
            return res.status(500).json({ error: error.message || 'Internal server error' })
        }
    }

    static hideLectureContent = async (req: any, res: any) => {
        const lectureContentDao = new LectureContentDao()
        try {

            await LectureContentIdValidation(req.body.id)
            await LectureIdValidation(req.body.lectureId)

            const lectureContent = await lectureContentDao.hideLectureContent(req.body.id)
            return res.status(200).json({ message: 'Lecture content hidden successfully', data: lectureContent })
        } catch (error: any) {
            console.log(error)
            return res.status(500).json({ error: error.message || 'Internal server error' })
        }
    }

    static deleteLectureContent = async (req: any, res: any) => {
        const lectureContentDao = new LectureContentDao()
        try {

            await LectureContentIdValidation(req.body.id)
            // await LectureIdValidation(req.body.lectureId)

            const lectureContent = await lectureContentDao.deleteLectureContent(req.body.id)
            return res.status(200).json({ message: 'Lecture content deleted successfully', data: lectureContent })
        } catch (error: any) {
            console.log(error)
            return res.status(500).json({ error: error.message || 'Internal server error' })
        }
    }
}
