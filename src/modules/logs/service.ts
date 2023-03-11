import { PrismaClient } from '@prisma/client'
import { inject, injectable, Lifecycle, scoped } from 'tsyringe'
import { HttpError } from '~/core/filter/error'

@injectable()
@scoped(Lifecycle.ContainerScoped)
export class LogsService {
  constructor(@inject('PrismaClient') private readonly prisma: PrismaClient) {}

  async getLogCountByMonths(months: number): Promise<number[]> {
    if (isNaN(months)) {
      throw new HttpError(400, 'Invalid number of months')
    }

    try {
      const now = new Date()
      const countArray: number[] = []

      // Get the count of logs for the current day
      const currentDayLogCount = await this.prisma.client_logins.count({
        where: {
          date: {
            gte: new Date(now.getFullYear(), now.getMonth(), now.getDate()),
            lt: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1),
          },
          user: 1,
        },
      })
      countArray.push(currentDayLogCount)

      // Get the counts of logs for the past 12 months in reverse order
      for (let i = months; i >= 1; i--) {
        const startDate = new Date(now.getFullYear(), now.getMonth() - i + 1, 1)
        const endDate = new Date(now.getFullYear(), now.getMonth() - i + 2, 0)

        const monthLogCount = await this.prisma.client_logins.count({
          where: {
            date: {
              gte: startDate,
              lt: new Date(
                endDate.getFullYear(),
                endDate.getMonth(),
                endDate.getDate() + 1
              ),
            },
            user: 1,
          },
        })
        countArray.push(monthLogCount)
      }

      return countArray
    } catch (error) {
      throw error
    }
  }
}
