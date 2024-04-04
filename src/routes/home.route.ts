import express from 'express'

const router = express.Router()

router.get('/', async (req, res, next) => {
    res.send({ message: 'Awesome it works 🐻' })
})

export default router
