import { AddOrderController } from '@/presentation/controllers'
import { makeArrayValidator, makeCheckProductsHasStock, makeAddOrder, makeUpdateProductStock } from '@/main/factories'

export const makeAddOrderController = (): AddOrderController => {
  return new AddOrderController(
    makeArrayValidator(),
    makeCheckProductsHasStock(),
    makeAddOrder(),
    makeUpdateProductStock()
  )
}
