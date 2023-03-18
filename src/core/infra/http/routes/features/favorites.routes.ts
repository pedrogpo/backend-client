import { Router } from 'express'
import FavoriteFeaturesController from '~/modules/favorites/features/controller'

const routes = Router()

const favoriteFeaturesController = new FavoriteFeaturesController()

routes.get('/favorites/features', (req, res) =>
  favoriteFeaturesController.getAll(req, res)
)
routes.post('/favorites/features/', (req, res) =>
  favoriteFeaturesController.addFavorite(req, res)
)
routes.delete('/favorites/features/', (req, res) =>
  favoriteFeaturesController.removeFavorite(req, res)
)

export { routes as favoriteFeaturesRoutes }
