import { ContactUsDao } from '@models/dao/contactus.dao'
import { ContactUsDto } from '../models/dto/contactUs.dto'
import { contactUsValidation } from '@middlewares/validation/content/contactUs.validation'
import { Request, Response } from 'express'

export class ContactUsController {
    static createContactUs = async (req: Request, res: Response) => {
        const contactUsDto = new ContactUsDto(req.body)
        const contactUsDao = new ContactUsDao()

        try {
            const { error } = await contactUsValidation.createContactUs(contactUsDto)
            if (error) return res.status(400).json({ message: error.message })

            const contactUs = await contactUsDao.createContactUs(contactUsDto)

            return res
                .status(200)
                .json({ message: 'Contact us created successfully', data: contactUs, state: 'success' })
        } catch (error: any) {
            console.log(error)
            return res.status(500).json({ error: error.details[0].message })
        }
    }

    static getContactUsById = async (req: Request, res: Response) => {
        const { contactUsId } = req.params
        const contactUsDao = new ContactUsDao()

        try {
            const contactUs = await contactUsDao.getContactUsById(contactUsId)

            return res.status(200).json({ data: contactUs, state: 'success' })
        } catch (error: any) {
            console.log(error)
            return res.status(500).json({ error: error })
        }
    }

    static getContactUs = async (req: Request, res: Response) => {
        const contactUsDao = new ContactUsDao()

        try {
            const contactUs = await contactUsDao.getContactUs()

            return res.status(200).json({ data: contactUs, state: 'success' })
        } catch (error: any) {
            console.log(error)
            return res.status(500).json({ error: error })
        }
    }

    static updateContactUs = async (req: Request, res: Response) => {
        const contactUsDto = new ContactUsDto(req.body)
        const contactUsDao = new ContactUsDao()

        try {
            const { error } = await contactUsValidation.createContactUs(contactUsDto)
            if (error) return res.status(400).json({ message: error.message })

            const contactUs = await contactUsDao.updateContactUs(contactUsDto)

            return res
                .status(200)
                .json({ message: 'Contact us updated successfully', data: contactUs, state: 'success' })
        } catch (error: any) {
            // Add an opening curly brace here
        }
    }

    static deleteContactUs = async (req: Request, res: Response) => {
        const { contactUsId } = req.params
        const contactUsDao = new ContactUsDao()

        try {
            const contactUs = await contactUsDao.deleteContactUs(contactUsId)

            return res
                .status(200)
                .json({ message: 'Contact us deleted successfully', data: contactUs, state: 'success' })
        } catch (error: any) {
            console.log(error)
            return res.status(500).json({ error: error })
        }
    }
}
