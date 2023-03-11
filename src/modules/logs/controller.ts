import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { LogsService } from './service'

export default class LogsController {
  private readonly logsService = container.resolve(LogsService)

  async getLogCountByMonths(req: Request, res: Response) {
    const months = Number(req.params.months)

    const features = await this.logsService.getLogCountByMonths(months)

    return res.json(features)
  }
}
