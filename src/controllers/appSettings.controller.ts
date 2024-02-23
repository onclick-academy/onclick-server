import { AppSettingsDao } from '@models/dao/appSettings.dao'
import { AppSettingsDto } from '@models/dto/appSettings.dto'
import { AppSettingsValidation } from '@middlewares/validation/content/appSettings.validation'
import { Request, Response } from 'express'

export class AppSettingsController {
    static async createAppSettings(req: any, res: Response) {
        const appSettingsDto = new AppSettingsDto(req.body)
        const appSettingsDao = new AppSettingsDao()

        appSettingsDto.adminId = req.user.id

        if (req.file) {
            appSettingsDto.logo = req.file.path
            appSettingsDto.favicon = req.file.path
            appSettingsDto.coverSlides = req.files.map((file: any) => file.path)
        }

        try {
            const { error } = await AppSettingsValidation.createAppSettings(appSettingsDto)
            if (error) res.status(400).json({ message: error.message })

            const appSettings = await appSettingsDao.createAppSettings(appSettingsDto)
            return res
                .status(201)
                .json({ message: 'App settings created successfully', data: appSettings, status: 'success' })
        } catch (error) {
            console.log(error)
            res.status(400).json({ message: error }) // error.message
        }
    }

    static async getAppSettings(req: Request, res: Response) {
        const { settingId } = req.params
        const appSettingsDao = new AppSettingsDao()

        try {
            const appSettings = await appSettingsDao.getAppSettings(settingId)
            return res
                .status(200)
                .json({ message: 'App settings retrieved successfully', data: appSettings, status: 'success' })
        } catch (error) {
            console.log(error)
            res.status(400).json({ message: error }) // error.message
        }
    }

    static async updateAppSettings(req: any, res: Response) {
        const appSettingsDto = new AppSettingsDto(req.body)
        const appSettingsDao = new AppSettingsDao()
        appSettingsDto.id = req.params.settingId
        appSettingsDto.adminId = req.user.id

        if (req.file) {
            if (appSettingsDto.logo) appSettingsDto.logo = req.file.path
            if (appSettingsDto.favicon) appSettingsDto.favicon = req.file.path
            if (appSettingsDto.coverSlides) appSettingsDto.coverSlides = req.files.map((file: any) => file.path)
        }

        try {
            const { error } = await AppSettingsValidation.updateAppSettings(appSettingsDto)
            if (error) res.status(400).json({ message: error.message })

            const appSettings = await appSettingsDao.updateAppSettings(appSettingsDto)
            return res
                .status(200)
                .json({ message: 'App settings updated successfully', data: appSettings, status: 'success' })
        } catch (error) {
            console.log(error)
            res.status(400).json({ message: error }) // error.message
        }
    }
}
