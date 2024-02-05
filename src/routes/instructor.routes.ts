import express from 'express';

import { InstructorController } from '../controllers/instructor.controller';

const router = express.Router();

router.post('/:userId', InstructorController.createInstructor);


export default router;