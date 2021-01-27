import { Controller, HttpResponse } from '@/presentation/protocols'
import { ok, serverError } from '@/presentation/helpers'
import { LoadOrders } from '@/domain/use-cases'

export class LoadOrdersController implements Controller {
  constructor (
    private readonly loadOrders: LoadOrders
  ) { }

  async handle (): Promise<HttpResponse> {
    try {
      const orders = await this.loadOrders.load()
      return ok(orders)
    } catch (error) {
      return serverError(error)
    }
  }
}
