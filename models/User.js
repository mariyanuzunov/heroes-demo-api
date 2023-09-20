import mongoose from 'mongoose'
import paginate from 'mongoose-paginate-v2'

import cryptoHelpers from '../utils/crypto.js'

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    salt: { type: String, required: true, select: false },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    gender: { type: String, enum: ['male', 'female'], required: true },
    birthDate: { type: Date, default: null },
    avatar: { type: String, default: null }
  },
  {
    timestamps: true
  }
)

userSchema.method({
  authenticate: function (password) {
    return cryptoHelpers.generateHashedPassword(this.salt, password) === this.password
  }
})

userSchema.plugin(paginate)

const User = mongoose.model('User', userSchema)
export default User
