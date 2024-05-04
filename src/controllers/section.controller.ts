import { SectionDto } from '@models/dto/section.dto'
import { SectionDao } from '@models/dao/section.dao'
import { SectionValidation } from '@middlewares/validation/course/section.validation'
import { Request, Response } from 'express'
import { CourseIdValidation, SectionIdValidation } from '@utilities/IdValidation/coursePackage.id'

export class SectionController {
    static createSection = async (req: Request, res: Response) => {
        const sectionDto = new SectionDto(req.body)
        const sectionDao = new SectionDao()

        try {
            await CourseIdValidation(sectionDto.courseId)

            const { error } = await SectionValidation.createSection(sectionDto)
            if (error) return res.status(400).json({ message: error.message })

            const section = await sectionDao.createSection(sectionDto)

            return res.status(200).json({ message: 'Section created successfully', data: section, state: 'success' })
        } catch (error: any) {
            console.log(error)
            return res.status(500).json({ error: error.details[0].message })
        }
    }

    static getSectionById = async (req: Request, res: Response) => {
        const { sectionId } = req.params
        const sectionDao = new SectionDao()

        try {
            const section = await sectionDao.getSectionById(sectionId)

            return res.status(200).json({ data: section, state: 'success' })
        } catch (error: any) {
            console.log(error)
            return res.status(500).json({ error: error })
        }
    }

    static getSectionsByCourseId = async (req: Request, res: Response) => {
        const { courseId } = req.params
        const sectionDao = new SectionDao()

        try {
            await CourseIdValidation(courseId)

            const sections = await sectionDao.getSictionsByCourseId(courseId)

            return res.status(200).json({ data: sections, state: 'success' })
        } catch (error: any) {
            console.log(error)
            return res.status(500).json({ error: error })
        }
    }

    static updateSection = async (req: Request, res: Response) => {
        const sectionDto = new SectionDto(req.body)
        const sectionDao = new SectionDao()

        try {
            let sectionId = req.body.id

            await SectionIdValidation(sectionId)
            await CourseIdValidation(sectionDto.courseId)

            const { error } = await SectionValidation.updateSection(sectionDto)
            if (error) return res.status(400).json({ message: error.message })

            const updatedSection = await sectionDao.updateSection(sectionDto)

            return res
                .status(200)
                .json({ message: 'Section updated successfully', data: updatedSection, state: 'success' })
        } catch (error: any) {
            console.log(error)
            return res.status(500).json({ error: error.details[0].message })
        }
    }

    static softDeleteSection = async (req: Request, res: Response) => {
        const { sectionId } = req.params
        const sectionDao = new SectionDao()

        try {
            await SectionIdValidation(sectionId)

            const deletedSection = await sectionDao.softDeleteSection(sectionId)

            return res
                .status(200)
                .json({ message: 'Section deleted (softly) successfully', data: deletedSection, state: 'success' })
        } catch (error: any) {
            console.log(error)
            return res.status(500).json({ error: error })
        }
    }

    static hardDeleteSection = async (req: Request, res: Response) => {
        const { sectionId } = req.params
        const sectionDao = new SectionDao()

        try {
            await SectionIdValidation(sectionId)

            const deletedSection = await sectionDao.hardDeleteSection(sectionId)

            return res
                .status(200)
                .json({ message: 'Section deleted successfully', data: deletedSection, state: 'success' })
        } catch (error: any) {
            console.log(error)
            return res.status(500).json({ error: error })
        }
    }
}
