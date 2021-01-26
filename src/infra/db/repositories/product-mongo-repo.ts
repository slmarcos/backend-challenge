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
    const quantity = action === ACTION_INCREMENTED
      ? product.quantity
      : product.quantity * -1
    await ProductModel.updateOne({ name: product.name, quantity: { $gt: 0 } }, { $inc: { quantity } })
  }
}
