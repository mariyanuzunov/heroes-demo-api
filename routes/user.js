import express from 'express'

import * as controller from '../controllers/user.js'

import userCheck from '../middleware/userCheck.js'

const router = express.Router()

router.get('/current', userCheck(), controller.getCurrentUser)

export default router
