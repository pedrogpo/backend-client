import { Router } from 'express'
import LogsController from '~/modules/logs/controller'

const routes = Router()

const logsController = new LogsController()

routes.get('/logs/count/:months', (req, res) =>
  logsController.getLogCountByMonths(req, res)
)

export { routes as logsRoutes }
