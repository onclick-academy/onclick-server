import prisma from '@models/prisma/prisma-client'

export class EventDao {
    createEvent = async (eventDto: EventDtoI) => {
        const newEvent = await prisma.event.create({
            data: eventDto
        })

        return newEvent
    }

    getAllEvents = async () => {
        const events = await prisma.event.findMany({
            where: {
                isDeleted: false
            }
        })

        return events
    }

    getEventById = async (eventId: string) => {
        const event = await prisma.event.findUnique({
            where: {
                id: eventId
            }
        })

        return event
    }

    updateEvent = async (eventDto: EventUpdateI) => {
        const updatedEvent = await prisma.event.update({
            where: {
                id: eventDto.id
            },
            data: eventDto
        })

        return updatedEvent
    }

    softDeleteEvent = async (eventId: string) => {
        const event = await prisma.event.findUnique({
            where: {
                id: eventId
            }
        })

        if (!event) throw new Error('Event not found')

        const deletedEvent = await prisma.event.update({
            where: {
                id: eventId
            },
            data: {
                isDeleted: true,
                deletedAt: new Date()
            }
        })

        return deletedEvent
    }
}
