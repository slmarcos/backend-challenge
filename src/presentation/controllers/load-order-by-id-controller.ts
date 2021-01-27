import { Controller, HttpResponse, Validator } from '@/presentation/protocols'
import { badRequest, noContent, ok, serverError } from '@/presentation/helpers'
import { LoadOrderById } from '@/domain/use-cases'

export class LoadOrderByIdController implements Controller {
  constructor (
    private readonly validator: Validator,
    private readonly loadOrderById: LoadOrderById
  ) { }

  async handle (request: LoadOrderByIdController.Request): Promise<HttpResponse> {
    try {
      const error = this.validator.validate(request)
      if (error) {
        return badRequest(error)
      }
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
