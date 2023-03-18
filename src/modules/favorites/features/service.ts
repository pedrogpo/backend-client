import { features_favorited, PrismaClient } from '@prisma/client'
import { inject, injectable, Lifecycle, scoped } from 'tsyringe'
import { HttpError } from '~/core/filter/error'
import { IFavorite } from './models/favorite'

@injectable()
@scoped(Lifecycle.ContainerScoped)
export class FavoriteService {
  constructor(@inject('PrismaClient') private readonly prisma: PrismaClient) {}

  async getAll(client_id: number): Promise<IFavorite[]> {
    try {
      const favorites = await this.prisma.features_favorited.findMany({
        select: {
          id: true,
          featureId: true,
          date: true,
        },
        where: {
          userId: client_id,
        },
      })
      return favorites
    } catch (error) {
      throw error
    }
  }

  async addFavorite(client_id: number, feature_id: number) {
    try {
      const favoriteExists = await this.prisma.features_favorited.findFirst({
        where: {
          userId: client_id,
          featureId: feature_id,
        },
      })

      if (favoriteExists) {
        throw new HttpError(400, 'Feature already favorited')
      }

      return await this.prisma.features_favorited.create({
        data: {
          userId: client_id,
          featureId: feature_id,
        },
        select: {
          date: true,
        },
      })
    } catch (error) {
      throw error
    }
  }

  async removeFavorite(client_id: number, feature_id: number) {
    try {
      return await this.prisma.features_favorited.deleteMany({
        where: {
          userId: client_id,
          featureId: feature_id,
        },
      })
    } catch (error) {
      throw error
    }
  }
}
