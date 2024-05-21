import express from 'express'
import { EventController } from '@controllers/event.controller'

const router = express.Router()

router.route('/').get(EventController.getAllEvents).post(EventController.createEvent)

router
    .route('/:eventId')
    .get(EventController.getEventById)
    .put(EventController.updateEvent)
    .delete(EventController.softDeleteEvent)

export default router
