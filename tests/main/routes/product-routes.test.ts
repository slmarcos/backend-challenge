import app from '@/main/config/app'

import { ProductModel } from '@/infra/db/models'
import { MongoHelper } from '@/infra/db/helpers'

import request from 'supertest'
import faker from 'faker'

const MONGO_URL = process.env.MONGO_URL as string

describe('Product Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    await ProductModel.deleteMany({})
  })

  describe('[GET] /products/:name', () => {
    test('Should return 204 on load product not exists', async () => {
      await request(app)
        .get('/products/product_name')
        .expect(204)
    })

    test('Should return 200 on load product', async () => {
      const mockProduct = {
        name: faker.commerce.productName(),
        price: 5.50,
        quantity: 1
      }
      const product = await ProductModel.create(mockProduct)
      await request(app)
        .get(`/products/${product.name}`)
        .expect(200)
    })
  })
})
