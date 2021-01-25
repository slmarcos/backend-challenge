import { ProductModel } from '@/domain/models'

import faker from 'faker'

export const mockProductModel = (): ProductModel => ({
  name: faker.commerce.productName(),
  price: Number(faker.commerce.price),
  quantity: faker.random.number()
})
