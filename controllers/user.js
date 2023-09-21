import User from '../models/User.js'

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
