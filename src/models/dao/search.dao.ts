import prisma from '@models/prisma/prisma-client'

export class SearchDao {
    search = async (query: string) => {
        console.log(query)
        const courses = await prisma.course.findMany({
            where: {
                OR: [
                    {
                        title: {
                            contains: query
                        }
                    },
                    {
                        description: {
                            contains: query
                        }
                    }
                ]
            }
        })

        const users = await prisma.user.findMany({
            where: {
                OR: [
                    {
                        username: {
                            contains: query
                        }
                    },
                    {
                        email: {
                            contains: query
                        }
                    },
                    {
                        firstName: {
                            contains: query
                        }
                    },
                    {
                        lastName: {
                            contains: query
                        }
                    }
                ]
            }
        })

        const topics = await prisma.topic.findMany({
            where: {
                title: {
                    contains: query
                }
            }
        })

        const categories = await prisma.category.findMany({
            where: {
                title: {
                    contains: query
                }
            }
        })

        const subcategories = await prisma.subCategory.findMany({
            where: {
                name: {
                    contains: query
                }
            }
        })

        return {
            courses: courses,
            users: users,
            topics: topics,
            categories: categories,
            subcategories: subcategories
        }
    }
}
