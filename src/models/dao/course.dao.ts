import { title } from 'process'
import prisma from '../../../prisma/prisma-client'
export class CourseDao {
    applyCourse = async (courseDto: CourseDtoI) => {
        const { topics, subCategories, ...courseData } = courseDto
        const newCourse = await prisma.course.create({
            data: {
                ...courseData,
                subCategories: {
                    connect: subCategories.map(subCategoryId => ({ id: subCategoryId }))
                },
                topics: {
                    connect: topics.map(topicId => ({ id: topicId }))
                }
            },
            include: {
                topics: true
            }
        })

        // const topicIds = topics.map(topicId => ({ id: topicId }));
        // const topicTitles = await prisma.topic.findMany({
        //     where: { OR: topicIds },
        //     select: { id: true, title: true }
        // });

        // const courseTopics = topics.map(topicId => {
        //     const topic = topicTitles.find(t => t.id === topicId);
        //     return {
        //         title: topic ? topic.title : '',
        //         topicId,
        //         courseId: newCourse.id
        //     };
        // });

        // const topicsNN = await prisma.topic.createMany({
        //     data: courseTopics
        // });

        return {
            newCourse
            // topicsNN
        }
    }

    getAllCourses = async () => {
        const courses = await prisma.course.findMany({
            where: {
                isDeleted: false
            },
            include: {
                topics: true,
                sections: {
                    include: {
                        lectures: true
                    }
                },
                enrollments: true,
                subCategories: true,
                ratings: true,
                CourseOwners: true,
                category: true
            }
        })
        return courses
    }

    getCourseById = async (id: string) => {
        const course = await prisma.course.findUnique({
            where: {
                id: id,
                isDeleted: false
            },
            include: {
                topics: true,
                sections: {
                    include: {
                        lectures: true
                    }
                },
                enrollments: true,
                subCategories: true,
                ratings: true,
                CourseOwners: {
                    include: {
                        user: true
                    }
                },
                category: true
            }
        })
        return course
    }

    getCoursesByInstructorId = async (instructorId: string) => {
        const courses = await prisma.course.findMany({
            where: {
                CourseOwners: {
                    some: {
                        userId: instructorId
                    }
                },
                isDeleted: false
            }
        })
        return courses
    }

    getCoursesByCategoryId = async (categoryId: string) => {
        const courses = await prisma.course.findMany({
            where: {
                categoryId: categoryId,
                isDeleted: false
            }
        })

        return courses
    }

    getCoursesBySubCategoryId = async (subCategoryId: string) => {
        const courses = await prisma.subCategory.findUnique({
            where: {
                id: subCategoryId
            },
            include: {
                courses: true
            }
        })
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
                        topics: true,
                        sections: {
                            include: {
                                lectures: true
                            }
                        },
                        enrollments: true,
                        subCategories: true,
                        ratings: true,
                        CourseOwners: {
                            include: {
                                user: true
                            }
                        },
                        category: true
                    }
                }
            }
        })

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
                    }
                ]
            }
        })
        return courses
    }

    updateCourse = async (courseDto: CourseUpdateI) => {
        const updatedCourse = await prisma.course.update({
            where: {
                id: courseDto.id
            },
            data: courseDto
        })
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
        })
        return deletedCourse
    }
}
