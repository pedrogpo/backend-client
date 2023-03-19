import express from 'express'
import 'express-async-errors'
import { featureRoutes } from './routes/features/features.routes'
import { logsRoutes } from './routes/logs.routes'
import { handleErrors } from './middleware/handleErrors'
import { ensureAuthentication } from './middleware/ensureAuthentication'
import { JWTService } from '~/core/services/jwt'
import { container } from 'tsyringe'
import { favoriteFeaturesRoutes } from './routes/features/favorites.routes'
import cors from 'cors'

const app = express()

app.use(express.json())

app.use(
  cors({
    origin: 'http://localhost:3000',
  })
)

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
