import { NewsDao } from '../models/dao/news.dao'
import { NewsDto } from '../models/dto/news.dto'
import { newsValidation } from '../middlewares/validation/content/news.validation'
import { Request, Response } from 'express'

export class NewsController {
    static createNews = async (req: Request, res: Response) => {
        const newsDao = new NewsDao()
        const newsDto = new NewsDto(req.body)

        try {
            const { error } = await newsValidation.createNews(newsDto)
            if (error) throw new Error(error.details[0].message)
            const newNews = await newsDao.createNews(newsDto)

            return res.status(201).json({ message: 'News created successfuly', data: newNews, status: 'success' })
        } catch (error: any) {
            return res.status(400).json({ error: error.message, status: 'failed' })
        }
    }

    static getAllNews = async (req: Request, res: Response) => {
        const newsDao = new NewsDao()

        try {
            const news = await newsDao.getAllNews()

            return res.status(200).json({ message: 'All News retreived successfully', data: news, status: 'success' })
        } catch (error: any) {
            return res.status(400).json({ error: error.message, status: 'failed' })
        }
    }

    static getNewsById = async (req: Request, res: Response) => {
        const newsDao = new NewsDao()
        const newsId = req.params.newsId

        try {
            const news = await newsDao.getNews(newsId)

            return res.status(200).json({ message: 'News retreived successfully', data: news, status: 'success' })
        } catch (error: any) {
            return res.status(400).json({ error: error.message, status: 'failed' })
        }
    }

    static updateNews = async (req: Request, res: Response) => {
        const newsDao = new NewsDao()
        const newsDto = new NewsDto(req.body)
        newsDto.id = req.params.newsId

        try {
            const { error } = await newsValidation.updateNews(newsDto)
            if (error) throw new Error(error.details[0].message)
            const updatedNews = await newsDao.updateNews(newsDto)

            return res.status(200).json({ message: 'News updated successfuly', data: updatedNews, status: 'success' })
        } catch (error: any) {
            return res.status(400).json({ error: error.message, status: 'failed' })
        }
    }
    static deleteNews = async (req: Request, res: Response) => {
        const newsDao = new NewsDao()
        const newsId = req.params.newsId

        try {
            const news = await newsDao.deleteNews(newsId)

            return res.status(200).json({ message: 'News deleted successfuly', data: news, status: 'success' })
        } catch (error: any) {
            return res.status(400).json({ error: error.message, status: 'failed' })
        }
    }
}
