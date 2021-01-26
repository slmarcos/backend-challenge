import { DbCheckProductsHasStock } from '@/data/use-cases'
import { CheckProductsHasStock } from '@/domain/use-cases'
import { ProductMongoRepo } from '@/infra/db/repositories'

export const makeCheckProductsHasStock = (): CheckProductsHasStock => {
  const productMongoRepo = new ProductMongoRepo()
  return new DbCheckProductsHasStock(productMongoRepo)
}
