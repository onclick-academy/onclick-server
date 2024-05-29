import prisma from '@models/prisma/prisma-client'

const fetchCourses = async ({ search = '', offset = 0, limit = 10, isDeleted = false }) => {
    const where = {
        isDeleted,
        ...(search && {
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
                    category: {
                        title: {
                            contains: search,
                            mode: 'insensitive'
                        }
                    }
                },
                {
                    subCategories: {
                        some: {
                            name: {
                                contains: search,
                                mode: 'insensitive'
                            }
                        }
                    }
                },
                {
                    topics: {
                        some: {
                            title: {
                                contains: search,
                                mode: 'insensitive'
                            }
                        }
                    }
                }
            ]
        })
    } as any

    const courses = await prisma.course.findMany({
        where,
        select: {
            id: true,
            photo: true,
            title: true,
            price: true,
            description: true,
            ratings: {
                select: {
                    rate: true
                }
            },
            sections: {
                select: {
                    lectures: {
                        select: {
                            _count: true
                        }
                    }
                }
            },
            CourseOwners: {
                select: {
                    user: {
                        select: {
                            firstName: true,
                            lastName: true,
                            profilePic: true
                        }
                    },
                    role: true
                }
            },
            _count: {
                select: {
                    enrollments: true,
                    ratings: true
                }
            },
            category: {
                select: {
                    title: true
                }
            },
            subCategories: {
                select: {
                    name: true
                }
            },
            topics: {
                select: {
                    title: true
                }
            }
        },
        skip: +offset || 0,
        take: +limit || 10
    })

    const totalCourses = await prisma.course.count({ where })

    return {
        courses,
        totalCourses
    }
}

export default fetchCourses
