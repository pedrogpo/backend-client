import express from 'express'
import 'express-async-errors'
import { featureRoutes } from './routes/features/features.routes'
import { logsRoutes } from './routes/logs.routes'
import { handleErrors } from './middleware/handleErrors'
import { ensureAuthentication } from './middleware/ensureAuthentication'
import { JWTService } from '~/core/services/jwt'
import { container } from 'tsyringe'
import { favoriteFeaturesRoutes } from './routes/features/favorites.routes'

const app = express()

app.use(express.json())

app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001')

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', 'true')

  // Pass to next layer of middleware
  next()
})

app.get('/', (req, res) => {
  const jwtService = container.resolve(JWTService)

  const token = jwtService.sign({
    id: '1',
    email: 'ploowcs@gmail.com',
  })

  res.json({ token })
})

app.use(ensureAuthentication)

app.use(featureRoutes)
app.use(favoriteFeaturesRoutes)
app.use(logsRoutes)

app.use(handleErrors)

export { app }
