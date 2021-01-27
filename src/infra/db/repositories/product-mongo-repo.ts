import { ProductModel } from '@/infra/db/models'
import { LoadProductByNameRepo, UpdateProductStockRepo } from '@/data/protocols'

export class ProductMongoRepo implements LoadProductByNameRepo, UpdateProductStockRepo {
  async loadByName (name: string): Promise<LoadProductByNameRepo.Result> {
    const product = await ProductModel
      .findOne({ name })
      .select({ _id: false })
    return product ? product.toObject({ versionKey: false }) as LoadProductByNameRepo.Result : null
  }

  async updateStock (action: string, product: UpdateProductStockRepo.Product): Promise<void> {
    const ACTION_INCREMENTED = 'incremented'
    let minValue = 0
    let quantity = 0
    if (action === ACTION_INCREMENTED) {
      quantity = product.quantity
      minValue = 0
    } else {
      quantity = product.quantity * -1
      minValue = 1
    }
    await ProductModel.updateOne({ name: product.name, quantity: { $gte: minValue } }, { $inc: { quantity } })
  }
}
