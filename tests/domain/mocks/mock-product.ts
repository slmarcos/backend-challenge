import { ProductModel } from '@/domain/models'

import faker from 'faker'

export const mockProductModel = (): ProductModel => ({
  name: faker.commerce.productName(),
  price: parseFloat(faker.commerce.price(undefined, undefined, 2)),
  quantity: faker.random.number(100)
})

export const mockProducts = (): ProductModel[] => [
  {
    name: faker.commerce.productName(),
    price: parseFloat(faker.commerce.price()),
    quantity: faker.random.number()
  },
  {
    name: faker.commerce.productName(),
    price: parseFloat(faker.commerce.price()),
    quantity: faker.random.number()
  }
]
