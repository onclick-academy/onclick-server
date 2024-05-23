import { title } from 'process'
import prisma from '../prisma/prisma-client'
import { ROLE_OF_INSTRUCTOR } from '@prisma/client'
export class CourseDao {
    applyCourse = async (courseDto: CourseDtoI) => {
        const { topics, subCategories, adminId, CourseOwners, ...courseData } = courseDto
        if (!adminId) {
            throw new Error('Admin ID is not provided')
        }
        const newCourse = await prisma.course.create({
            data: {
                ...courseData,
                adminId,
                subCategories: {
                    connect: subCategories.map(subCategoryId => ({ id: subCategoryId }))
                },
                topics: {
                    connect: topics.map(topicId => ({ id: topicId }))
                },
                CourseOwners: {
                    create: CourseOwners.map(userId => ({
                        user: { connect: { id: userId } },
                        role: ROLE_OF_INSTRUCTOR.PUBLISHER
                    }))
                }
            },
            include: {
                topics: true,
                CourseOwners: true
            }
        })

        return newCourse
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

    enrollCourse = async (userId: string, courseId: string) => {
        const enrollment = await prisma.courseEnrollment.create({
            data: {
                userId: userId,
                courseId: courseId
            }
        })
        return enrollment
    }

    isEnrolled = async (userId: string, courseId: string) => {
        const enrollment = await prisma.courseEnrollment.findFirst({
            where: {
                courseId: courseId,
                userId: userId
            }
        })
        return enrollment
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
