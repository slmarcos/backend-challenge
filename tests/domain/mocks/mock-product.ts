import { ProductModel, ProductOrderParam } from '@/domain/models'

import faker from 'faker'

export const mockProductModel = (): ProductModel => ({
  name: faker.commerce.productName(),
  price: parseFloat(faker.commerce.price(undefined, undefined, 2)),
  quantity: 100
})

export const mockProductModels = (): ProductModel[] => [
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

export const mockProductsOrderParams = (): ProductOrderParam[] => [
  {
    name: faker.commerce.productName(),
    quantity: 10
  },
  {
    name: faker.commerce.productName(),
    quantity: 5
  }
]
