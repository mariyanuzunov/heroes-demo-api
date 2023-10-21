import User from '../models/User.js'
import Hero from '../models/Hero.js'

import rest from '../utils/rest.js'

export const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user._id }).lean()

    return rest.successRes(res, user)
  } catch (error) {
    console.log(error)
    return rest.errorRes(res, error.message)
  }
}

export const getUsers = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.body

    const users = await User.paginate({}, { page, limit, populate: ['heroesCount'], sort: { createdAt: -1 }, lean: true })

    return rest.successRes(res, users)
  } catch (error) {
    console.log(error)
    return rest.errorRes(res, error.message)
  }
}

export const getUserHeroes = async (req, res) => {
  try {
    const { userId } = req.params

    const heroes = await Hero.find({ user: userId })
      .populate([{ path: 'race', populate: 'heroClass' }])
      .lean()

    return rest.successRes(res, heroes)
  } catch (error) {
    console.log(error)
    return rest.errorRes(res, error.message)
  }
}
