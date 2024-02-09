import prisma from "../prisma/prisma-client";

export class CourseDao {
    createCourse = async (courseDto: CourseDtoI, topicId: string) => {
        const newCourse = await prisma.course.create({
            data: {
                ...courseDto,
                topics: {
                    create: {
                        topic: {
                            connect: {
                                id: topicId
                            }
                        }
                    }
            }},
            include: {
                topics: true
            }
        }) as GlobalCourseI
        return newCourse
    }

    getAllCourses = async () => {
        const courses = await prisma.course.findMany({
            where: {
                isDeleted: false
            }
        }) as GlobalCourseI[]
        return courses
    }

    getCourseById = async (id: string) => {
        const course = await prisma.course.findUnique({
            where: {
                id: id,
                isDeleted: false
            }
        }) as GlobalCourseI
        return course
    }

    getCoursesByInstructorId = async (instructorId: string) => {
        const courses = await prisma.course.findMany({
            where: {
                instructorId: instructorId,
                isDeleted: false
            }
        }) as GlobalCourseI[]
        return courses
    }

    getCoursesByCategoryId = async (categoryId: string) => {
        const courses = await prisma.course.findMany({
            where: {
                categoryId: categoryId,
                isDeleted: false
            }
        }) as GlobalCourseI[]

        return courses
    }

    getCoursesBySubCategoryId = async (subCategoryId: string) => {
        const courses = await prisma.course.findMany({
            where: {
                subCategoryId: subCategoryId,
                isDeleted: false
            }
        }) as GlobalCourseI[]
        return courses
    }

    getCoursesByTopicId = async (topicId: string) => {
        const courses = await prisma.topic.findUnique({
            where: {
                id: topicId
            },
            include: {
                courses: {
                    include: {
                        course: true
                    }
                }
            }
        }) as unknown as GlobalCourseI[]

        return courses
    }

    searchCourses = async (search: string) => {
        const courses = await prisma.course.findMany({
            where: {
                OR: [
                    {
                        title: {
                            contains: search,
                            mode: 'insensitive'
                        }
                    },
                    {
                        description: {
                            contains: search,
                            mode: 'insensitive'
                        }
                    },
                    {
                        skillsGained: {
                            hasSome: search.split(' ')
                        }
                    }
                ]
            }
        }) as GlobalCourseI[]
        return courses
    }

    updateCourse = async (courseDto: CourseUpdateI) => {
        const updatedCourse = await prisma.course.update({
            where: {
                id: courseDto.id
            },
            data: courseDto
        }) as GlobalCourseI
        return updatedCourse
    }

    deleteCourse = async (id: string) => {
        const deletedCourse = await prisma.course.update({
            where: {
                id: id
            },
            data: {
                isDeleted: true,
                deletedAt: new Date()
            }
        }) as GlobalCourseI
        return deletedCourse
    }
}