import express from 'express';

import { InstructorController } from '../controllers/instructor.controller';

const router = express.Router();


router.route('/apply').post(InstructorController.ApplyInstructor);


export default router;