import { DbUpdateProductStock } from '@/data/use-cases'
import { UpdateProductStock } from '@/domain/use-cases'
import { ProductMongoRepo } from '@/infra/db/repositories'

export const makeUpdateProductStock = (): UpdateProductStock => {
  const productMongoRepo = new ProductMongoRepo()
  return new DbUpdateProductStock(productMongoRepo)
}
