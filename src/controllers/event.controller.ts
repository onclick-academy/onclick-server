import { EventsValidation } from "@middlewares/validation/content/events.validation"
import { EventDao } from "@models/dao/event.dao"
import { Response } from "express"


export class EventController {
    static createEvent = async (req: any, res: Response) => {
        const eventDto = req.body
        // const adminId = req.user.id // TODO later

        if (req.files) {
            if (eventDto.images) eventDto.images = req.files.map((file: any) => file.path)
            eventDto.cover = req.files[0].path
        }
        // eventDto.adminId = adminId
        eventDto.startDate = new Date(eventDto.startDate)
        eventDto.endDate = new Date(eventDto.endDate)

        if (eventDto.endDate < eventDto.startDate) return res.status(400).json({ error: 'End date cannot be less than start date' })

        const eventDao = new EventDao()
        try {
            const { error } =  await EventsValidation.createEvents(eventDto)
            if (error) return res.status(400).json({ error: error.message })

            const newEvent = await eventDao.createEvent(eventDto)
            return res.status(201).json({message: "Event created successfuly", data: newEvent, status: 'success' })
        } catch (error: any) {
            console.log(error);
            return res.status(500).json({ error: error.message })
        }
    }

    static getAllEvents = async (req: any, res: Response) => {
        const eventDao = new EventDao()
        try {
            const events = await eventDao.getAllEvents()
            return res.status(200).json({message: "Events fetched successfuly", data: events, status: 'success' })
        } catch (error: any) {
            console.log(error);
            return res.status(500).json({ error: error.message })
        }
    }

    static getEventById = async (req: any, res: Response) => {
        const eventId = req.params.eventId
        const eventDao = new EventDao()
        try {
            const event = await eventDao.getEventById(eventId)
            return res.status(200).json({message: "Event fetched successfuly", data: event, status: 'success' })
        } catch (error: any) {
            console.log(error);
            return res.status(500).json({ error: error.message })
        }
    }

    static updateEvent = async (req: any, res: Response) => {
        const eventDto = req.body
        eventDto.id = req.params.eventId
        // eventDto.adminId = req.user.id
        if (eventDto.startDate) eventDto.startDate = new Date(eventDto.startDate)
        if (eventDto.endDate) eventDto.endDate = new Date(eventDto.endDate)
        if (eventDto.endDate < eventDto.startDate) return res.status(400).json({ error: 'End date cannot be less than start date' })

        if (req.files) {
            if (eventDto.images) eventDto.images = req.files.map((file: any) => file.path)
            eventDto.cover = req.files[0].path
        }

        const eventDao = new EventDao()
        try {
            const { error } =  await EventsValidation.updateEvents(eventDto)
            if (error) return res.status(400).json({ error: error.message })

            const updatedEvent = await eventDao.updateEvent(eventDto)
            return res.status(200).json({message: "Event updated successfuly", data: updatedEvent, status: 'success' })
        } catch (error: any) {
            console.log(error);
            return res.status(500).json({ error: error.message })
        }
    }

    static softDeleteEvent = async (req: any, res: Response) => {
        const eventId = req.params.eventId
        const eventDao = new EventDao()
        try {
            const deletedEvent = await eventDao.softDeleteEvent(eventId)
            return res.status(200).json({message: "Event deleted successfuly", data: deletedEvent, status: 'success' })
        } catch (error: any) {
            console.log(error);
            return res.status(500).json({ error: error.message })
        }
    }
}