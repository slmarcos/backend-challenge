import { AddOrder } from '@/domain/use-cases'
import { mockProducts } from './mock-product'

import faker from 'faker'

export const mockOrderParams = (): AddOrder.Params => ({
  products: [
    {
      name: faker.commerce.productName(),
      quantity: faker.random.number()
    },
    {
      name: faker.commerce.productName(),
      quantity: faker.random.number()
    }
  ]
})

export const mockOrderModel = (): AddOrder.Result => {
  const products = mockProducts()
  const total = products.reduce((acc, value) => {
    return value.price + acc
  }, 0)

  return {
    id: faker.random.uuid(),
    products,
    total
  }
}
