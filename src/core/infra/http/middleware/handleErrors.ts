import { Prisma } from '@prisma/client'
import { NextFunction, Request, Response } from 'express'
import { HttpError } from '~/core/filter/error'

export async function handleErrors(
  err: any,
  request: Request,
  response: Response,
  next: NextFunction
) {
  if (err instanceof HttpError) {
    return response.status(err.statusCode).json({
      message: err.message,
    })
  }

  if (err instanceof Prisma.PrismaClientValidationError) {
    return response.status(400).json({ message: 'Bad Request' })
  }

  if (err instanceof Prisma.NotFoundError) {
    return response.status(404).json({ message: 'Not Found' })
  }

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === 'P2025') {
      return response.status(409).json({ message: 'Conflict' })
    }
  }

  if (err instanceof Error) {
    return response.status(400).json({
      message: err.message,
    })
  }

  if (process.env.NODE_ENV === 'development') {
    return response.status(500).json(err)
  }

  return response.status(500).json({
    status: 'error',
    message: 'Internal Server Error',
  })
}
