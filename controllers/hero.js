import Joi from 'joi'

import Hero from '../models/Hero.js'
import HeroClass from '../models/HeroClass.js'
import HeroRace from '../models/HeroRace.js'

import rest from '../utils/rest.js'

// hero classes

export const createClass = async (req, res) => {
  try {
    // validate request body
    try {
      const validationSchema = Joi.object({
        name: Joi.string().trim().required()
      }).options({ stripUnknown: true })

      req.body = await validationSchema.validateAsync(req.body)
    } catch (error) {
      return rest.errorRes(res, error.message, 422)
    }

    const heroClass = await HeroClass.create(req.body)

    return rest.successRes(res, heroClass)
  } catch (error) {
    console.log(error)
    return rest.errorRes(res, error.message)
  }
}

export const getClasses = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.body

    const heroClasses = await HeroClass.paginate({}, { page, limit })

    return rest.successRes(res, heroClasses)
  } catch (error) {
    console.log(error)
    return rest.errorRes(res, error.message)
  }
}

export const getClass = async (req, res) => {
  try {
    const { classId } = req.params

    const heroClass = await HeroClass.findOne({ _id: classId })
    if (!heroClass) {
      return rest.errorRes(res, `Hero class ${classId}`, 404)
    }

    return rest.successRes(res, heroClass)
  } catch (error) {
    console.log(error)
    return rest.errorRes(res, error.message)
  }
}

export const updateClass = async (req, res) => {
  try {
    // TODO
    throw new Error('Not implemented')
  } catch (error) {
    console.log(error)
    return rest.errorRes(res, error.message)
  }
}

export const deleteClass = async (req, res) => {
  try {
    // TODO
    throw new Error('Not implemented')
  } catch (error) {
    console.log(error)
    return rest.errorRes(res, error.message)
  }
}

// hero races

export const createRace = async (req, res) => {
  try {
    // validate request body
    try {
      const validationSchema = Joi.object({
        name: Joi.string().trim().required(),
        class: Joi.string().required(),
        abilities: Joi.array().items(Joi.string().trim()).min(1).required()
      }).options({ stripUnknown: true })

      req.body = await validationSchema.validateAsync(req.body)
    } catch (error) {
      return rest.errorRes(res, error.message, 422)
    }

    const heroClass = await HeroClass.findOne({ _id: req.body.class })
    if (!heroClass) {
      return rest.errorRes(res, `Hero class ${req.body.class} not found`, 404)
    }

    const heroRace = await HeroRace.create(req.body)
    const populatedHeroRace = await HeroRace.populate(heroRace, { path: 'class' })

    return rest.successRes(res, populatedHeroRace)
  } catch (error) {
    console.log(error)
    return rest.errorRes(res, error.message)
  }
}

export const getRaces = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.body

    const heroRaces = await HeroRace.paginate({}, { page, limit })

    return rest.successRes(res, heroRaces)
  } catch (error) {
    console.log(error)
    return rest.errorRes(res, error.message)
  }
}

export const getRace = async (req, res) => {
  try {
    const { raceId } = req.params

    const heroRace = await HeroRace.findOne({ _id: raceId })
    if (!heroRace) {
      return rest.errorRes(res, `Hero race ${raceId} not found`, 422)
    }

    return rest.successRes(res, heroRace)
  } catch (error) {
    console.log(error)
    return rest.errorRes(res, error.message)
  }
}

export const updateRace = async (req, res) => {
  try {
    // TODO
    throw new Error('Not implemented')
  } catch (error) {
    console.log(error)
    return rest.errorRes(res, error.message)
  }
}

export const deleteRace = async (req, res) => {
  try {
    // TODO
    throw new Error('Not implemented')
  } catch (error) {
    console.log(error)
    return rest.errorRes(res, error.message)
  }
}

// heroes

export const createHero = async (req, res) => {
  try {
    // validate request body
    try {
      const validationSchema = Joi.object({
        name: Joi.string().trim().required(),
        race: Joi.string().required(),
        avatar: Joi.string().trim().uri().required()
      }).options({ stripUnknown: true })

      req.body = await validationSchema.validateAsync(req.body)
    } catch (error) {
      return rest.errorRes(res, error.message, 422)
    }

    const heroRace = await HeroRace.findOne({ _id: req.body.race })
    if (!heroRace) {
      return rest.errorRes(res, `Hero race ${req.body.race} not found`, 404)
    }

    const hero = await Hero.create({ ...req.body, user: req.user._id })

    return rest.successRes(res, hero)
  } catch (error) {
    console.log(error)
    return rest.errorRes(res, error.message)
  }
}

export const getHeroes = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.body

    const heroes = await Hero.paginate({}, { page, limit, populate: [{ path: 'race', populate: 'class' }] })

    return rest.successRes(res, heroes)
  } catch (error) {
    console.log(error)
    return rest.errorRes(res, error.message)
  }
}

export const getHero = async (req, res) => {
  try {
    const { heroId } = req.params

    const hero = await Hero.findOne({ _id: heroId }).populate([{ path: 'race', populate: 'class' }])
    if (!hero) {
      return rest.errorRes(res, `Hero ${heroId} not found`, 404)
    }

    return rest.successRes(res, hero)
  } catch (error) {
    console.log(error)
    return rest.errorRes(res, error.message)
  }
}

export const updateHero = async (req, res) => {
  try {
    // TODO
    throw new Error('Not implemented')
  } catch (error) {
    console.log(error)
    return rest.errorRes(res, error.message)
  }
}

export const deleteHero = async (req, res) => {
  try {
    // TODO
    throw new Error('Not implemented')
  } catch (error) {
    console.log(error)
    return rest.errorRes(res, error.message)
  }
}
