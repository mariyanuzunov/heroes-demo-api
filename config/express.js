import express from 'express'
import cors from 'cors'
import morgan from 'morgan'

export default (app) => {
  app.use(express.urlencoded({ extended: false }))
  app.use(express.json())
  app.use(cors())
  app.use(morgan('dev'))
}
