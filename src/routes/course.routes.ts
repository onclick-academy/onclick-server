import express from 'express';

import { CourseController } from '../controllers/course.controller';
import e from 'express';

const router = express.Router();

router.route('/:topicId/:adminId').post( CourseController.createCourse)

export default router;