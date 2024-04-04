import express from 'express';
import { SectionController } from '@controllers/section.controller';

const router = express.Router();

router
    .route('/')
    .post(SectionController.createSection)
    .put(SectionController.updateSection);

router
    .route('/:sectionId')
    .get(SectionController.getSectionById)
    .put(SectionController.softDeleteSection)
    .delete(SectionController.hardDeleteSection);

router
    .route('/course/:courseId')
    .get(SectionController.getSectionsByCourseId);

export default router;
