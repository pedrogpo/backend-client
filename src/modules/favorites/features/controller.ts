import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { FavoriteService } from './service'

export default class FavoriteFeaturesController {
  private readonly favoriteFeaturesService = container.resolve(FavoriteService)

  async getAll(req: Request, res: Response) {
    const { client_id } = req

    const favorites = await this.favoriteFeaturesService.getAll(Number(client_id))

    return res.json(favorites)
  }

  async addFavorite(req: Request, res: Response) {
    const { client_id } = req
    const { featureId } = req.body

    const favorite = await this.favoriteFeaturesService.addFavorite(
      Number(client_id),
      Number(featureId)
    )

    return res.json(favorite)
  }

  async removeFavorite(req: Request, res: Response) {
    const { client_id } = req
    const { featureId } = req.body

    const favorite = await this.favoriteFeaturesService.removeFavorite(
      Number(client_id),
      Number(featureId)
    )

    return res.json(favorite)
  }
}
