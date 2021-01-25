import { ProductModel } from '@/domain/models'

import faker from 'faker'

export const mockProductModel = (): ProductModel => ({
  name: faker.commerce.productName(),
  price: parseFloat(faker.commerce.price(undefined, undefined, 2)),
  quantity: faker.random.number(100)
})
