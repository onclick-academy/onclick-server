import { SearchController } from '@controllers/search.controller'
import { verifyAdminRole } from '@middlewares/admin.middleware'
import { AuthMiddleware } from '@middlewares/auth.middleware'
import express from 'express'

const router = express.Router()

router.use('/categories', require('./category.route').default)
router.use('/subcategories', require('./subCategory.routes').default)
router.use('/topics', require('./topic.routes').default)
router.use('/ratings', require('./rating.route').default)
router.use('/courses', require('./course.route').default)

router.use(AuthMiddleware.verifyToken)

router.use('/files', require('@routes/files.route').default)

router.post('/search/:query', SearchController.search)

// course routes

router.use('/admin', verifyAdminRole, require('@routes/admin.route').default) // TODO uncomment and delete next line
// router.use('/admin', require('@routes/admin.route').default)

// Users Routes
router.use('/users', require('./user.route').default)

// instructor routes
router.use('/instructors', require('./instructor.routes').default)

// deviceTokens routes
router.use('/devicetokens', require('./deviceTokens.route').default)

// Notifications route
router.use('/notifications', require('./notification.route').default)

// lecture content routes
router.use('/lectures', require('./lecture.route').default)

// lecture routes
router.use('/sections', require('./section.route').default)

// wishlist routes
router.use('/wishlist', require('./wishlist.route').default)

// event routes
router.use('/events', require('./event.route').default)

// susspendState routes
router.use('/susspendState', require('./suspendState.route').default)

// course enreollment routes
router.use('/courseEnrolls', require('./courseEnrollment.route').default)

export default router
