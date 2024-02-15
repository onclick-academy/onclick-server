import { LectureDto } from "@models/dto/lecture.dto";
import { LectureDao } from "@models/dao/lecture.dao";
import { lectureValidation } from "@middlewares/validation/course/lecture.validation";
import { Request, Response } from "express";

export class LectureController {

    static createLecture = async (req: Request, res: Response) => {
        const lectureDto = new LectureDto(req.body);
        const lectureDao = new LectureDao();

        try {
            const { error } = await lectureValidation.createLecture(lectureDto);
            if (error) return res.status(400).json({ message: error.message });

            const lecture = await lectureDao.createLecture(lectureDto);

            return res.status(200).json({message: 'Lecture created successfully', data: lecture, state: 'success'});
        } catch (error: any) {
            console.log(error);
            return res.status(500).json({ error: error.details[0].message });
        }
    }

    static getLectureById = async (req: Request, res: Response) => {
        const { lectureId } = req.params;
        const lectureDao = new LectureDao();

        try {
            const lecture = await lectureDao.getLectureById(lectureId);

            return res.status(200).json({ data: lecture, state: 'success' });
        } catch (error: any) {
            console.log(error);
            return res.status(500).json({ error: error });
        }
    }

    static getLecturesByCourseId = async (req: Request, res: Response) => {
        const { courseId } = req.params;
        const lectureDao = new LectureDao();

        try {
            const lectures = await lectureDao.getLecturesByCourseId(courseId);

            return res.status(200).json({ data: lectures, state: 'success' });
        } catch (error: any) {
            console.log(error);
            return res.status(500).json({ error: error });
        }
    }

    static updateLecture = async (req: Request, res: Response) => {
        const lectureDto = new LectureDto(req.body);
        const lectureDao = new LectureDao();

        try {
            const { error } = await lectureValidation.updateLecture(lectureDto);
            if (error) return res.status(400).json({ message: error.message });

            const updatedLecture = await lectureDao.updateLecture(lectureDto);

            return res.status(200).json({ message: 'Lecture updated successfully', data: updatedLecture, state: 'success' });
        } catch (error: any) {
            console.log(error);
            return res.status(500).json({ error: error.details[0].message });
        }
    }

    static softDeleteLecture = async (req: Request, res: Response) => {
        const { lectureId } = req.params;
        const lectureDao = new LectureDao();

        try {
            const deletedLecture = await lectureDao.softDeleteLecture(lectureId);

            return res.status(200).json({ message: 'Lecture deleted (softly) successfully', data: deletedLecture, state: 'success' });
        } catch (error: any) {
            console.log(error);
            return res.status(500).json({ error: error });
        }
    }

    static hardDeleteLecture = async (req: Request, res: Response) => {
        const { lectureId } = req.params;
        const lectureDao = new LectureDao();

        try {
            const deletedLecture = await lectureDao.hardDeleteLecture(lectureId);

            return res.status(200).json({ message: 'Lecture deleted successfully', data: deletedLecture, state: 'success' });
        } catch (error: any) {
            console.log(error);
            return res.status(500).json({ error: error });
        }
    }
}