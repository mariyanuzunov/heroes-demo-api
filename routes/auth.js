import express from 'express'

import * as controller from '../controllers/auth.js'

const router = express.Router()

router.post('/sign-up', controller.signUp)
router.post('/sign-in', controller.signIn)

export default router
