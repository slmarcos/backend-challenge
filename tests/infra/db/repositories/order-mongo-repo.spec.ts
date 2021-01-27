import { OrderMongoRepo } from '@/infra/db/repositories'
import { MongoHelper } from '@/infra/db/helpers'
import { OrderModel } from '@/infra/db/models'
import { mockOrderToSave } from '@/tests/domain/mocks'

const MONGO_URI = process.env.MONGO_URL as string

type SutTypes = {
  sut: OrderMongoRepo
}

const makeSut = (): SutTypes => {
  const sut = new OrderMongoRepo()
  return {
    sut
  }
}

describe('OrderMongoRepo', () => {
  beforeAll(async () => {
    await MongoHelper.connect(MONGO_URI)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    await OrderModel.deleteMany({})
  })

  describe('add()', () => {
    test('Should return order on success', async () => {
      const { sut } = makeSut()
      const params = mockOrderToSave()
      const order = await sut.add(params)
      const total = params.products.reduce((acc, value) => (acc + (value.price * value.quantity)), 0)
      expect(order.id).toBeTruthy()
      expect(order.products[0].name).toBe(params.products[0].name)
      expect(order.total).toBe(total)
    })
  })

  describe('load()', () => {
    test('Should return all orders on success', async () => {
      const { sut } = makeSut()
      await OrderModel.create(mockOrderToSave())
      const result = await sut.load()
      expect(result).toBeTruthy()
      expect(result.orders.length).toBe(1)
    })

    test('Should return empty array if no order found', async () => {
      const { sut } = makeSut()
      const result = await sut.load()
      expect(result).toBeTruthy()
      expect(result.orders.length).toBe(0)
    })
  })
})
