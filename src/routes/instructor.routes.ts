import express from 'express'

import { InstructorController } from '../controllers/instructor.controller'

const router = express.Router()

router.route('/apply').post(InstructorController.ApplyInstructor)

// to admin route

router
  .route('/:instructorId')
  .get(InstructorController.getInstructorUserById)
  .put(InstructorController.updateInstructor)

router
  .route('/delete/:instructorId')
  .put(InstructorController.softDeleteInstructor)
  .delete(InstructorController.hardDeleteInstructor)

export default router
