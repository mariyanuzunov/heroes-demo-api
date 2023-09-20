import jwt from 'jsonwebtoken'

import settings from '../config/settings.js'
import User from '../models/User.js'

const userCheck = () => async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return res.status(401).end()
    }

    const token = req.headers.authorization.split('Bearer ')[1]
    if (!token) {
      return res.status(401).end()
    }

    const decoded = jwt.verify(token, settings.jwtSecret)

    const user = await User.findOne({ _id: decoded._id })
    if (!user) {
      return res.status(401).end()
    }

    req.user = user

    return next()
  } catch (error) {
    console.log(error)
    return res.status(401).end()
  }
}

export default userCheck
