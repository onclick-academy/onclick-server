import prisma from '../prisma/prisma-client'

export class NewsDao {
    createNews = async (newsDto: NewsDtoI) => {
        const news = await prisma.news.create({
            data: {
                id: newsDto.id,
                title: newsDto.title,
                subtitle: newsDto.subtitle,
                adminId: newsDto.adminId,
                description: newsDto.description,
                images: newsDto.images,
                isAvailable: newsDto.isAvailable,
                cover: newsDto.cover
            }
        })
        return news
    }

    getNews = async (id: string) => {
        const news = await prisma.news.findFirst({
            where: {
                id: id
            }
        })
        return news
    }

    getAllNews = async () => {
        const news = await prisma.news.findMany()
        return news
    }

    updateNews = async (newsDto: NewsDtoI) => {
        const news = await prisma.news.update({
            where: {
                id: newsDto.id
            },
            data: {
                title: newsDto.title,
                subtitle: newsDto.subtitle,
                adminId: newsDto.adminId,
                description: newsDto.description,
                images: newsDto.images,
                isAvailable: newsDto.isAvailable,
                cover: newsDto.cover
            }
        })
        return news
    }

    deleteNews = async (id: string) => {
        const news = await prisma.news.delete({
            where: {
                id: id
            }
        })
        return news
    }
}
