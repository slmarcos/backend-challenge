import { Controller, HttpResponse, Validator } from '@/presentation/protocols'
import { badRequest, ok, serverError } from '@/presentation/helpers'
import { AddOrder, CheckProductsHasStock, UpdateProductStock } from '@/domain/use-cases'
import { OrderParams } from '@/domain/models'

export class AddOrderController implements Controller {
  constructor (
    private readonly validator: Validator,
    private readonly checkProductsHasStock: CheckProductsHasStock,
    private readonly addOrder: AddOrder,
    private readonly updateProductSock: UpdateProductStock
  ) { }

  async handle (request: AddOrderController.Request): Promise<HttpResponse> {
    try {
      const error = this.validator.validate(request)
      if (error) {
        return badRequest(error)
      }
      const { products } = request
      const ACTION_DECREMENTED = 'decremented'
      const hasStock = await this.checkProductsHasStock.check(products)
      if (!hasStock) {
        return ok({
          message: 'stock unavailable'
        })
      }
      const order = await this.addOrder.add({ products })
      await this.updateProductSock.update(ACTION_DECREMENTED, products)
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
