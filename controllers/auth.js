import jwt from 'jsonwebtoken'
import Joi from 'joi'

import User from '../models/User.js'

import settings from '../config/settings.js'
import rest from '../utils/rest.js'
import cryptoHelpers from '../utils/crypto.js'

export const signUp = async (req, res) => {
  try {
    try {
      const validationSchema = Joi.object({
        name: Joi.string().trim().required(),
        email: Joi.string().trim().lowercase().email().required(),
        password: Joi.string().trim().min(4).required(),
        gender: Joi.string().valid('male', 'female').required(),
        birthDate: Joi.date().allow(null)
      }).options({ stripUnknown: true })

      req.body = await validationSchema.validateAsync(req.body)
    } catch (error) {
      return rest.errorRes(res, error.message, 422)
    }

    const { name, email, password, gender, birthDate } = req.body

    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return rest.errorRes(res, 'A user with this email already exists', 409)
    }

    const salt = cryptoHelpers.generateSalt()
    const hashedPassword = cryptoHelpers.generateHashedPassword(salt, password)

    await User.create({ name, email, password: hashedPassword, salt, gender, birthDate })

    return rest.successRes(res)
  } catch (error) {
    console.log(error)
    return rest.errorRes(res, error.message)
  }
}

export const signIn = async (req, res) => {
  try {
    try {
      const validationSchema = Joi.object({
        email: Joi.string().trim().lowercase().email().required(),
        password: Joi.string().trim().required()
      }).options({ stripUnknown: true })

      req.body = await validationSchema.validateAsync(req.body)
    } catch (error) {
      return rest.errorRes(res, error.message, 422)
    }

    const { email, password } = req.body

    const user = await User.findOne({ email }).select('+password +salt')

    const passwordMatch = user?.authenticate(password)
    if (!user || !passwordMatch) return rest.errorRes(res, 'Wrong email or password', 422)

    const token = jwt.sign({ _id: user._id }, settings.jwtSecret, { expiresIn: settings.jwtExpiration })

    return rest.successRes(res, { token, user })
  } catch (error) {
    console.log(error)
    return rest.errorRes(res, error.message)
  }
}
