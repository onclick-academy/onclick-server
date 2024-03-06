import { DeviceTokenController } from '@controllers/deviceTokens.controller'
import express from 'express'

const router = express.Router()

router.route('/').post(DeviceTokenController.create)
router.route('/:userId').get(DeviceTokenController.getUserTokens)

export default router
