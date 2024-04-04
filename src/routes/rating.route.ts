import express from 'express';
import { RatingController } from '@controllers/rating.controller';

const router = express.Router();

router
    .route('/')
    .post(RatingController.createRating)
    .put(RatingController.updateRating)
    .delete(RatingController.deleteRating);

router
    .route('/:ratingId')
    .get(RatingController.getRatingById);

router
    .route('/user/rate')
    .get(RatingController.getUserRating);

router
    .route('/course/rate/:courseId')
    .get(RatingController.getCourseRating);

router
    .route('/instructor/rate/:instructorId')
    .get(RatingController.getInstructorRating);

export default router;