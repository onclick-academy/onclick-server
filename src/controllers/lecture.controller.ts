import { LectureDao } from '@models/dao/lecture.dao'
import { LectureDto } from '@models/dto/lecture.dto'
import { LectureValidation } from '@middlewares/validation/course/lectures.validation'
import { LectureIdValidation, SectionIdValidation } from '@utilities/IdValidation/coursePackage.id'

export class LectureController {
    static createLecture = async (req: any, res: any) => {
        const lectureDto = new LectureDto(req.body)
        const lectureDao = new LectureDao()

        try {
            await SectionIdValidation(lectureDto.sectionId)

            const { error } = await LectureValidation.createLecture(lectureDto)
            if (error) return res.status(400).json({ message: error.message })

            const lecture = await lectureDao.createLecture(lectureDto)
            return res.status(201).json({ message: 'Lecture  created successfully', data: lecture })
        } catch (error: any) {
            console.log(error)
            return res.status(500).json({ error: error.message || 'Internal server error' })
        }
    }

    static getLecturesBySectionId = async (req: any, res: any) => {
        const lectureDao = new LectureDao()
        try {
            await LectureIdValidation(req.body.lectureId)

            const section = await lectureDao.getLectureBySectionId(req.body.lectureId)
            return res
                .status(200)
                .json({ message: 'Lectures retreived successufully', data: section, status: 'success' })
        } catch (error: any) {
            console.log(error)
            return res.status(500).json({ error: error.message || 'Internal server error' })
        }
    }

    static getLectureById = async (req: any, res: any) => {
        const lectureDao = new LectureDao()
        try {
            const lecture = await lectureDao.getLectureById(req.body.id)
            return res.status(200).json({ message: 'Lecture retreived successuffully', data: lecture })
        } catch (error: any) {
            console.log(error)
            return res.status(500).json({ error: error.message || 'Internal server error' })
        }
    }

    static updateLecture = async (req: any, res: any) => {
        const lectureDto = new LectureDto(req.body)
        const lectureDao = new LectureDao()
        try {
            let id = req.body.id

            await SectionIdValidation(lectureDto.sectionId)
            await LectureIdValidation(id)

            const { error } = await LectureValidation.updateLecture(lectureDto)
            if (error) return res.status(400).json({ message: error.message })

            const lecture = await lectureDao.updateLecture(lectureDto)
            return res.status(200).json({ message: 'Lecture  updated successfully', data: lecture })
        } catch (error: any) {
            console.log(error)
            return res.status(500).json({ error: error.message || 'Internal server error' })
        }
    }

    static softDeleteLecture = async (req: any, res: any) => {
        const lectureDao = new LectureDao()
        try {
            await LectureIdValidation(req.body.id)
            await SectionIdValidation(req.body.lectureId)

            const lecture = await lectureDao.softDeleteLecture(req.body.id)
            return res.status(200).json({ message: 'Lecture  hidden successfully', data: lecture })
        } catch (error: any) {
            console.log(error)
            return res.status(500).json({ error: error.message || 'Internal server error' })
        }
    }

    static hardDeleteLecture = async (req: any, res: any) => {
        const lectureDao = new LectureDao()
        try {
            await LectureIdValidation(req.body.id)
            const lecture = await lectureDao.hardDeleteLecture(req.body.id)
            return res.status(200).json({ message: 'Lecture  deleted successfully', data: lecture })
        } catch (error: any) {
            console.log(error)
            return res.status(500).json({ error: error.message || 'Internal server error' })
        }
    }
}
