import { DbLoadOrderById } from '@/data/use-cases'
import { LoadOrderById } from '@/domain/use-cases'
import { OrderMongoRepo } from '@/infra/db/repositories'

export const makeLoadOrderById = (): LoadOrderById => {
  const orderMongoRepo = new OrderMongoRepo()
  return new DbLoadOrderById(orderMongoRepo)
}
