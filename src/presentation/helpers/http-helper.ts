import { HttpResponse } from '@/presentation/protocols'
import { ServerError } from '@/presentation/errors'

export const noContent = (): HttpResponse => ({
  statusCode: 204,
  body: null
})

export const serverError = (error: Error): HttpResponse => ({
  statusCode: 500,
  error: new ServerError(error.stack)
})
