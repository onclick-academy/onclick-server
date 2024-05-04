import express from 'express'
import { SuspendStateController } from '@controllers/suspendState.controller'

const router = express.Router()

router.route('/').post(SuspendStateController.createSuspendState).put(SuspendStateController.updateSuspendState)

export default router
