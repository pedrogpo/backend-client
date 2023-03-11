import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { FeatureService } from './service'

export default class FeatureController {
  private readonly featureService = container.resolve(FeatureService)

  async getAll(req: Request, res: Response) {
    const features = await this.featureService.getAll()

    return res.json(features)
  }

  async getByID(req: Request, res: Response) {
    const id = Number(req.params.id)

    const features = await this.featureService.getById(id)

    return res.json(features)
  }

  async getLatests(req: Request, res: Response) {
    const features = await this.featureService.getLatests()

    return res.json(features)
  }
}
