import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { FeatureService } from './service'

export default class FeatureController {
  private readonly featureService = container.resolve(FeatureService)

  async getAll(req: Request, res: Response) {
    const users = await this.featureService.getAll()

    return res.json(users)
  }
}
