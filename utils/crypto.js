import crypto from 'node:crypto'

const generateSalt = () => crypto.randomBytes(128).toString('base64')
const generateHashedPassword = (salt, password) => crypto.createHmac('sha256', salt).update(password).digest('hex')

export default {
  generateSalt,
  generateHashedPassword
}
