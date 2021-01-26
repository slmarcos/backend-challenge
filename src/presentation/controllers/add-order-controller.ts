import { Controller, HttpResponse } from '@/presentation/protocols'
import { ok, serverError } from '@/presentation/helpers'
import { AddOrder, CheckProductsHasStock } from '@/domain/use-cases'
import { OrderParams } from '@/domain/models'

export class AddOrderController implements Controller {
  constructor (
    private readonly checkProductsHasStock: CheckProductsHasStock,
    private readonly addOrder: AddOrder
  ) { }

  async handle (request: AddOrderController.Request): Promise<HttpResponse> {
    try {
      const { products } = request
      const hasStock = await this.checkProductsHasStock.check(products)
      if (!hasStock) {
        return ok({
          message: 'stock unavailable'
        })
      }
      const order = await this.addOrder.add({ products })
      return ok(order)
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace AddOrderController {
  export type Request = OrderParams
  export type Result = HttpResponse
}
