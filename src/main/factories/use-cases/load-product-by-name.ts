import { LoadProductByName } from '@/domain/use-cases'
import { DbLoadProductByName } from '@/data/use-cases'
import { ProductMongoRepo } from '@/infra/db/repositories'

export const makeLoadProductByName = (): LoadProductByName => {
  const productMongoRepo = new ProductMongoRepo()
  return new DbLoadProductByName(productMongoRepo)
}
