import { UpdateProductStockRepo } from '@/data/protocols'
import { ProductOrderModel } from '@/domain/models'
import { UpdateProductStock } from '@/domain/use-cases'

export class DbUpdateProductStock implements UpdateProductStock {
  constructor (
    private readonly updateProductStockRepo: UpdateProductStockRepo
  ) { }

  async update (action: string, products: ProductOrderModel[]): Promise<void> {
    for (const item of products) {
      await this.updateProductStockRepo.updateStock(action, item)
    }
  }
}
