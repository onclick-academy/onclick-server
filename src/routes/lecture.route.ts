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


//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijg4ZGJlYjBlLTc1ZTItNDM1NS05NDMwLTJhM2Q3MGNlZGVlYSIsImVtYWlsIjoia2hvbG91ZGZhdHRlbUBnbWFpbC5jb20iLCJpYXQiOjE3MDc5NjkzOTAsImV4cCI6MTcwODIyODU5MH0.ePCco7E2qOecxNGJg1xr2bpF8m-G7xyuetsW7PdxmzQ