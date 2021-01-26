import { OrderModel, OrderParams, OrderToSave } from '@/domain/models'

import faker from 'faker'

export const mockOrderParams = (): OrderParams => ({
  products: [
    {
      name: faker.commerce.productName(),
      quantity: 15
    },
    {
      name: faker.commerce.productName(),
      quantity: 5
    }
  ]
})

export const mockOrderToSave = (): OrderToSave => ({
  products: [
    {
      name: faker.commerce.productName(),
      price: parseFloat(faker.commerce.price()),
      quantity: 15
    },
    {
      name: faker.commerce.productName(),
      price: parseFloat(faker.commerce.price()),
      quantity: 5
    }
  ]
})

export const mockOrderModel = (): OrderModel => ({
  id: faker.random.uuid(),
  products: [
    {
      name: faker.commerce.productName(),
      price: parseFloat(faker.commerce.price()),
      quantity: 15
    },
    {
      name: faker.commerce.productName(),
      price: parseFloat(faker.commerce.price()),
      quantity: 5
    }
  ],
  total: 20
})
