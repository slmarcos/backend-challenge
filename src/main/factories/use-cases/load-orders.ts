import { LoadOrders } from '@/domain/use-cases'
import { DbLoadOrders } from '@/data/use-cases'
import { OrderMongoRepo } from '@/infra/db/repositories'

export const makeLoadOrders = (): LoadOrders => {
  const orderMongoRepo = new OrderMongoRepo()
  return new DbLoadOrders(orderMongoRepo)
}
