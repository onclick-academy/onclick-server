import express from 'express';
import { CategoryController } from '../controllers/category.controller';

const router = express.Router();


router
    .route('/')
    .post(CategoryController.createCategory)


export default router