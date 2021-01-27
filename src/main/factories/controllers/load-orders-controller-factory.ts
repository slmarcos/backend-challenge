import { LoadOrdersController } from '@/presentation/controllers'
import { makeLoadOrders } from '@/main/factories'

export const makeLoadOrdersController = (): LoadOrdersController => {
  return new LoadOrdersController(makeLoadOrders())
}
