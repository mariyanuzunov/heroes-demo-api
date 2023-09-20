import mongoose from 'mongoose'

import settings from './settings.js'

import * as models from '../models/index.js' // eslint-disable-line

mongoose.set('strictQuery', true)

export default async () => {
  function setRunValidators() {
    this.setOptions({ runValidators: true })
  }

  mongoose.plugin((schema) => {
    schema.pre('findOneAndUpdate', setRunValidators)
    schema.pre('findByIdAndUpdate', setRunValidators)
    schema.pre('update', setRunValidators)
    schema.pre('updateOne', setRunValidators)
    schema.pre('updateMany', setRunValidators)
  })

  return new Promise((resolve, reject) => {
    mongoose.connect(settings.db, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })

    const db = mongoose.connection

    db.on('error', (error) => {
      console.error('Database error: ', error)
      reject(error)
    })

    db.once('open', () => {
      console.log(`MongoDB Connected: ${db.host}`)
      resolve()
    })
  })
}
