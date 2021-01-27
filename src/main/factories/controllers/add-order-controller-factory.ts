import { AddOrderController } from '@/presentation/controllers'
import { makeCheckProductsHasStock, makeAddOrder, makeUpdateProductStock } from '@/main/factories/use-cases'

export const makeAddOrderController = (): AddOrderController => {
  return new AddOrderController(makeCheckProductsHasStock(), makeAddOrder(), makeUpdateProductStock())
}
