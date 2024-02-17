import prisma from "@models/prisma/prisma-client";

export class AppSettingsDao {
    createAppSettings = async (appSettingsDto: AppSettingsDtoI) => {
        await prisma.appSettings.create({
            data: appSettingsDto
        })
    }

    getAppSettings = async (settingId: string) => {
        return await prisma.appSettings.findUnique({
            where: {
                id: settingId
            }
        })
    }

    updateAppSettings = async (appSettingsDto: AppSettingsDtoI) => {
        return await prisma.appSettings.update({
            where: {
                id: appSettingsDto.id
            },
            data: appSettingsDto
        })
    }

}