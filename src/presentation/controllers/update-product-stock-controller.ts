import { Controller } from '@/presentation/protocols'
import { UpdateProductStock } from '@/domain/use-cases'

export class UpdateProductStockController implements Controller {
  constructor (
    private readonly updateProductStock: UpdateProductStock
  ) { }

  async handle (request: UpdateProductStockController.Request): Promise<void> {
    try {
      const productParam = [{
        name: request.content,
        quantity: 1
      }]
      await this.updateProductStock.update(request.action, productParam)
    } catch (error) {
      // Log error
    }
  }
}

export namespace UpdateProductStockController {
  export type Request = {
    action: string
    content: string
  }
}
