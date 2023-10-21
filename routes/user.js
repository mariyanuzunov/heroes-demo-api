import express from 'express'

import * as controller from '../controllers/user.js'

import userCheck from '../middleware/userCheck.js'
import adminCheck from '../middleware/adminCheck.js'

const router = express.Router()

router.post('/list', adminCheck(), controller.getUsers)
router.get('/current', userCheck(), controller.getCurrentUser)

export default router
