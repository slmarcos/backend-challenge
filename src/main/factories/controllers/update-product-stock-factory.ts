import { UpdateProductStockController } from '@/presentation/controllers'
import { makeUpdateProductStock } from '@/main/factories/use-cases'

export const makeUpdateProductStockController = (): UpdateProductStockController => {
  return new UpdateProductStockController(makeUpdateProductStock())
}
