import { PrismaClient } from '@prisma/client'
import { inject, injectable, Lifecycle, scoped } from 'tsyringe'
import { IFeatures } from './models/feature'

@injectable()
@scoped(Lifecycle.ContainerScoped)
export class FeatureService {
  constructor(@inject('PrismaClient') private readonly prisma: PrismaClient) {}

  async getAll(): Promise<IFeatures[]> {
    try {
      const features: IFeatures[] = await this.prisma.features.findMany({
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
}
