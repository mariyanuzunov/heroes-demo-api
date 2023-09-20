import dotenv from 'dotenv'
dotenv.config()

// SERVER & DB
const port = process.env.PORT || 5000
const localDb = process.env.LOCAL_DB || 'mongodb://localhost:27017/demo-api'
const devDb = process.env.DEV_DB
const prodDb = process.env.DB

// JWT
const jwtSecret = process.env.JWT_SECRET || 'hjklgbGS#$JKHG#('
const jwtExpiration = process.env.JWT_EXPIRATION || '90d'

const common = {
  port,
  jwtSecret,
  jwtExpiration
}

const settings = {
  local: {
    ...common,
    db: localDb
  },
  development: {
    ...common,
    db: devDb
  },
  production: {
    ...common,
    db: prodDb
  }
}

const env = process.env.NODE_ENV || 'development'
console.log(`mode: ${env}`)
console.log(`NODE_ENV: ${process.env.NODE_ENV}`)

export default settings[env]
