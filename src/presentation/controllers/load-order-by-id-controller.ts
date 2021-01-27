import { Controller, HttpResponse } from '@/presentation/protocols'
import { noContent, ok, serverError } from '@/presentation/helpers'
import { LoadOrderById } from '@/domain/use-cases'

export class LoadOrderByIdController implements Controller {
  constructor (
    private readonly loadOrderById: LoadOrderById
  ) { }

  async handle (request: LoadOrderByIdController.Request): Promise<HttpResponse> {
    try {
      const { id } = request
      const order = await this.loadOrderById.loadById(id)
      if (!order) {
        return noContent()
      }
      return ok(order)
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace LoadOrderByIdController {
  export type Request = {
    id: string
  }
}
