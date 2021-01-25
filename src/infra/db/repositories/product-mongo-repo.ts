import { ProductModel } from '@/infra/db/models'
import { LoadProductByNameRepo } from '@/data/protocols'

export class ProductMongoRepo implements LoadProductByNameRepo {
  async loadByName (name: string): Promise<LoadProductByNameRepo.Result> {
    const product = await ProductModel
      .findOne({ name })
      .select({ _id: false })
    return product ? product.toObject({ versionKey: false }) as LoadProductByNameRepo.Result : null
  }
}
