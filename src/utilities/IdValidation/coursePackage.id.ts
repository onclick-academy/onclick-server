import prisma from '@models/prisma/prisma-client';

export async function CourseIdValidation(courseId: string) {
    const course = await prisma.course.findUnique({
        where: {
        id: courseId,
        isDeleted: false,
        },
    });

    if (!course) {
        throw new Error('Course not found');
    }
    };

export async function LectureIdValidation(lectureId: string) {
    const lecture = await prisma.lecture.findUnique({
        where: {
        id: lectureId,
        isDeleted: false,
        },
    });

    if (!lecture) {
        throw new Error('Lecture not found');
    }
    }

export async function LectureContentIdValidation(lectureContentId: string) {
    const lectureContent = await prisma.lecturesContent.findUnique({
        where: {
        id: lectureContentId,
        isDeleted: false,
        },
    });

    if (!lectureContent) {
        throw new Error('Lecture Content not found');
    }
    }


export async function TopicIdValidation(topicId: string) {
    const topic = await prisma.topic.findUnique({
        where: {
        id: topicId,
        isDeleted: false,
        },
    });

    if (!topic) {
        throw new Error('Topic not found');
    }
    }

export async function SubCategoryIdValidation(subCategoryId: string) {
    const subCategory = await prisma.subCategory.findUnique({
        where: {
        id: subCategoryId,
        isDeleted: false,
        },
    });

    if (!subCategory) {
        throw new Error('SubCategory not found');
    }
    }

export async function CategoryIdValidation(categoryId: string) {
    const category = await prisma.category.findUnique({
        where: {
        id: categoryId,
        isDeleted: false,
        },
    });

    if (!category) {
        throw new Error('Category not found');
    }
    }
