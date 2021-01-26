import { CheckProductsHasStock } from '@/domain/use-cases'
import { LoadProductByNameRepo } from '@/data/protocols'

export class DbCheckProductsHasStock implements CheckProductsHasStock {
  constructor (
    private readonly loadProductByNameRepo: LoadProductByNameRepo
  ) { }

  async check (data: CheckProductsHasStock.Params): Promise<CheckProductsHasStock.Result> {
    let hasStock = true
    for (const item of data) {
      const product = await this.loadProductByNameRepo.loadByName(item.name)
      if (!product || item.quantity > product.quantity) {
        hasStock = false
        break
      }
    }
    return hasStock
  }
}
