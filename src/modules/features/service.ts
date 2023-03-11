import { PrismaClient } from '@prisma/client'
import { inject, injectable, Lifecycle, scoped } from 'tsyringe'
import { HttpError } from '~/core/filter/error'
import { IFeature } from './models/feature'

@injectable()
@scoped(Lifecycle.ContainerScoped)
export class FeatureService {
  constructor(@inject('PrismaClient') private readonly prisma: PrismaClient) {}

  async getAll(): Promise<IFeature[]> {
    try {
      const features: IFeature[] = await this.prisma.features.findMany({
        select: {
          id: true,
          name: true,
          description: true,
          category: true,
          date: true,
          features_conditionals: true,
          features_sliders: true,
        },
      })
      return features
    } catch (error) {
      throw error
    }
  }

  async getById(id: number): Promise<IFeature | null> {
    if (!id) {
      throw new HttpError(400, 'The id is required to get the feature')
    }

    try {
      const feature: IFeature | null = await this.prisma.features.findUnique({
        where: {
          id,
        },
        select: {
          id: true,
          name: true,
          description: true,
          category: true,
          date: true,
          features_conditionals: true,
          features_sliders: true,
        },
      })

      if (!feature) {
        throw new HttpError(404, 'Feature not found')
      }

      return feature
    } catch (error) {
      throw error
    }
  }
}
