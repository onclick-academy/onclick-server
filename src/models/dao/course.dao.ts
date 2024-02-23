import prisma from '../prisma/prisma-client'

export class CourseDao {
    applyCourse = async (courseDto: CourseDtoI) => {
        const { topicIds, ...courseData } = courseDto
        const newCourse = await prisma.course.create({
            data: courseData
        })

        // TODO validate topicIds

        let newCourseTopics = []
        for (let id of courseDto.topicIds) {
            const newCourseTopic = await prisma.courseTopic.create({
                data: {
                    courseId: newCourse.id,
                    topicId: id
                }
            })
            newCourseTopics.push(newCourseTopic)
        }

        return {
            newCourse,
            newCourseTopics
        }
    }

    getAllCourses = async () => {
        const courses = await prisma.course.findMany({
            where: {
                isDeleted: false
            }
        })
        return courses
    }

    getCourseById = async (id: string) => {
        const course = await prisma.course.findUnique({
            where: {
                id: id,
                isDeleted: false
            }
        })
        return course
    }

    getCoursesByInstructorId = async (instructorId: string) => {
        const courses = await prisma.course.findMany({
            where: {
                createdBy: instructorId,
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
        const courses = await prisma.course.findMany({
            where: {
                subCategoryId: subCategoryId,
                isDeleted: false
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
                        course: true
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
                    },
                    {
                        skillsGained: {
                            hasSome: search.split(' ')
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
