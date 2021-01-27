import app from '@/main/config/app'

import { ProductModel, OrderModel } from '@/infra/db/models'
import { MongoHelper } from '@/infra/db/helpers'

import request from 'supertest'
import faker from 'faker'
import bson from 'bson-objectid'

const MONGO_URL = process.env.MONGO_URL as string

describe('Order Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    await ProductModel.deleteMany({})
    await OrderModel.deleteMany({})
  })

  describe('[GET] /orders', () => {
    test('Should return 200 and empty array if not exists orders', async () => {
      await request(app)
        .get('/orders')
        .expect(200, {
          orders: []
        })
    })

    test('Should return 200 and orders on load orders with success', async () => {
      const mockProduct = {
        name: faker.commerce.productName(),
        price: 5.50,
        quantity: 1
      }
      await ProductModel.create(mockProduct)
      const mockOrder = {
        products: [
          mockProduct
        ]
      }
      await OrderModel.create(mockOrder)
      await request(app)
        .get('/orders')
        .expect(200)
    })
  })

  describe('[GET] /orders/:id', () => {
    test('Should return 400 and invalid param error if order id is invalid', async () => {
      await request(app)
        .get('/orders/any_id')
        .expect(400, {
          error: 'Invalid param: id'
        })
    })

    test('Should return 204 if order id not found', async () => {
      const validId = bson.generate()
      await request(app)
        .get(`/orders/${validId}`)
        .expect(204)
    })

    test('Should return 200 on load order with success', async () => {
      const mockProduct = {
        name: faker.commerce.productName(),
        price: 5.50,
        quantity: 1
      }
      await ProductModel.create(mockProduct)
      const mockOrder = {
        products: [
          mockProduct
        ]
      }
      const order = await OrderModel.create(mockOrder)
      await request(app)
        .get(`/orders/${order.id as string}`)
        .expect(200)
    })
  })

  describe('[POST] /orders', () => {
    test('Should return 400 and invalid param error if product arrays ir empty', async () => {
      const mockRequest = {
        products: []
      }
      await request(app)
        .post('/orders')
        .send(mockRequest)
        .expect(400, {
          error: 'Invalid param: products'
        })
    })

    test('Should return 400 and missing param error if product attribute not send', async () => {
      const mockRequest = {
        any_field: []
      }
      await request(app)
        .post('/orders')
        .send(mockRequest)
        .expect(400, {
          error: 'Missing param: products'
        })
    })

    test('Should return 200 on create order with success', async () => {
      const mockProduct = {
        name: faker.commerce.productName(),
        price: 5.50,
        quantity: 1
      }
      await ProductModel.create(mockProduct)
      const mockOrder = {
        products: [
          mockProduct
        ]
      }
      await OrderModel.create(mockOrder)
      const mockRequest = {
        products: [{ ...mockProduct }]
      }
      await request(app)
        .post('/orders')
        .send(mockRequest)
        .expect(200)
    })

    test('Should return 200 and message stock unavailable', async () => {
      const mockProduct = {
        name: faker.commerce.productName(),
        price: 5.50,
        quantity: 1
      }
      await ProductModel.create(mockProduct)
      const mockOrder = {
        products: [
          mockProduct
        ]
      }
      await OrderModel.create(mockOrder)
      const mockRequest = {
        products: [{ ...mockProduct, quantity: 10 }]
      }
      await request(app)
        .post('/orders')
        .send(mockRequest)
        .expect(200, {
          message: 'stock unavailable'
        })
    })
  })
})
