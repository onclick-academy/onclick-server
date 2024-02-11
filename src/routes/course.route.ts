import express from 'express'

import { CourseController } from '../controllers/course.controller'

const router = express.Router()

router.route('/').post(CourseController.applyCourse)

router.route('/').get(CourseController.getAllCourses)

router
    .route('/:courseId')
    .get(CourseController.getCourseById)
    .put(CourseController.updateCourse)
    .delete(CourseController.deleteCourse)

router.route('/instructor/:instructorId').get(CourseController.getCoursesByInstructorId)

router.route('/category/:categoryId').get(CourseController.getCoursesByCategoryId)

router.route('/subCategory/:subCategoryId').get(CourseController.getCoursesBySubCategoryId)

router.route('/topic/:topicId').get(CourseController.getCoursesByTopicId)

export default router
