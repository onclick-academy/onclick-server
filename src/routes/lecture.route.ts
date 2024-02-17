import express from 'express';
import { LectureController } from '@controllers/lecture.controller';

const router = express.Router();

router
    .route('/')
    .post(LectureController.createLecture)
    .put(LectureController.updateLecture);

router
    .route('/:lectureId')
    .get(LectureController.getLectureById)
    .put(LectureController.softDeleteLecture)
    .delete(LectureController.hardDeleteLecture);

router
    .route('/course/:courseId')
    .get(LectureController.getLecturesByCourseId);

export default router;
