import { UpdateProductStockRepo } from '@/data/protocols'
import { ProductOrderParam } from '@/domain/models'
import { UpdateProductStock } from '@/domain/use-cases'

export class DbUpdateProductStock implements UpdateProductStock {
  constructor (
    private readonly updateProductStockRepo: UpdateProductStockRepo
  ) { }

  async update (action: string, products: ProductOrderParam[]): Promise<void> {
    for (const item of products) {
      await this.updateProductStockRepo.updateStock(action, item)
    }
  }
}
