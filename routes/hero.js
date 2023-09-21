import express from 'express'

import * as controller from '../controllers/hero.js'

import userCheck from '../middleware/userCheck.js'
import adminCheck from '../middleware/adminCheck.js'

const router = express.Router()

// hero classes
router.post('/classes', adminCheck(), controller.createClass)
router.post('/classes/list', userCheck(), controller.getClasses)
router.get('/classes/:classId', userCheck(), controller.getClass)
router.put('/classes/:classId', adminCheck(), controller.updateClass)
router.delete('/classes/:classId', adminCheck(), controller.deleteClass)

// hero races
router.post('/races', adminCheck(), controller.createRace)
router.post('/races/list', userCheck(), controller.getRaces)
router.get('/races/:raceId', userCheck(), controller.getRace)
router.put('/races/:raceId', adminCheck(), controller.updateRace)
router.delete('/races/raceId', adminCheck(), controller.deleteRace)

// heroes
router.post('/', userCheck(), controller.createHero)
router.post('/list', userCheck(), controller.getHeroes)
router.get('/:heroId', userCheck(), controller.getHero)
router.put('/:heroId', userCheck(), controller.updateHero)
router.delete('/:heroId', userCheck(), controller.deleteHero)

export default router
