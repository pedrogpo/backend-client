import { Router } from 'express'
import FeatureController from '~/modules/features/controller'

const routes = Router()

const featureController = new FeatureController()

routes.get('/feature', (req, res) => featureController.getAll(req, res))
routes.get('/feature/latests', (req, res) => featureController.getLatests(req, res))
routes.get('/feature/:id', (req, res) => featureController.getByID(req, res))

export { routes as featureRoutes }
