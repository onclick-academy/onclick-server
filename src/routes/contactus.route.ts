import express from 'express'
import { ContactUsController } from '@controllers/contactus.controller'

const router = express.Router()

router.route('/').post(ContactUsController.createContactUs).get(ContactUsController.getContactUs)

router
    .route('/:contactUsId')
    .get(ContactUsController.getContactUsById)
    .put(ContactUsController.updateContactUs)
    .delete(ContactUsController.deleteContactUs)


export default router