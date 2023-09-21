import authRouter from './auth.js'
import userRouter from './user.js'
import heroRouter from './hero.js'

export default (app) => {
  app.get('/', async (req, res) => {
    return res.status(200).send('Hello there!').end()
  })

  app.use('/auth', authRouter)
  app.use('/users', userRouter)
  app.use('/heroes', heroRouter)

  // Catch all other routes
  app.get('*', (req, res) => {
    return res.status(404).send('Page Not Found!').end()
  })
}
