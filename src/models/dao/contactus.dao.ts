import prisma from '@models/prisma/prisma-client'
import { ContactUsDtoI } from '../../types/contactus.interface'
export class ContactUsDao {
    createContactUs = async (contactUsDto: ContactUsDtoI) => {
        const contactUs = await prisma.contactUs.create({
            data: {
                id: contactUsDto.id,
                name: contactUsDto.name,
                email: contactUsDto.email,
                message: contactUsDto.message,
                phone: contactUsDto.phone,
                isRead: contactUsDto.isRead
            }
        })
        return contactUs
    }

    getContactUsById = async (contactUsId: string) => {
        const contactUs = await prisma.contactUs.findUnique({
            where: {
                id: contactUsId
            }
        })

        if (!contactUs) {
            throw new Error('No contact us found')
        }

        return contactUs
    }

    getContactUs = async () => {
        const contactUs = await prisma.contactUs.findMany()
        return contactUs
    }

    updateContactUs = async (contactUsDto: ContactUsDtoI) => {
        const contactUs = await this.getContactUsById(contactUsDto.id)
        const updatedContactUs = await prisma.contactUs.update({
            where: {
                id: contactUs.id
            },
            data: {
                name: contactUsDto.name,
                email: contactUsDto.email,
                message: contactUsDto.message,
                phone: contactUsDto.phone,
                isRead: contactUsDto.isRead
            }
        })

        return updatedContactUs
    }

    deleteContactUs = async (contactUsId: string) => {
        const contactUs = await this.getContactUsById(contactUsId)
        const deletedContactUs = await prisma.contactUs.delete({
            where: {
                id: contactUs.id
            }
        })

        return deletedContactUs
    }
}
