import express from 'express'
import { AppSettingsController } from '@controllers/appSettings.controller'

const router = express.Router()

router.route('/').post(AppSettingsController.createAppSettings)
router.route('/:settingId').get(AppSettingsController.getAppSettings).put(AppSettingsController.updateAppSettings)

export default router
