import { DbAddOrder } from '@/data/use-cases'
import { AddOrder } from '@/domain/use-cases'
import { OrderMongoRepo, ProductMongoRepo } from '@/infra/db/repositories'

export const makeAddOrder = (): AddOrder => {
  const productMongoRepo = new ProductMongoRepo()
  const orderMongoRepo = new OrderMongoRepo()
  return new DbAddOrder(productMongoRepo, orderMongoRepo)
}
