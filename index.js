import http from 'node:http'
import express from 'express'

import settings from './config/settings.js'
import expressConfig from './config/express.js'
import routesConfig from './routes/index.js'

import connectDB from './config/db.js'

const app = express()
const httpServer = http.createServer(app)

expressConfig(app)
routesConfig(app)
await connectDB()

httpServer.listen(settings.port, () => {
  console.log(`Server listening on port ${settings.port}`)
})
