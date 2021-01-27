import { ProductMongoRepo } from '@/infra/db/repositories'
import { MongoHelper } from '@/infra/db/helpers'
import { ProductModel } from '@/infra/db/models'
import { mockProductModel } from '@/tests/domain/mocks'

const MONGO_URI = process.env.MONGO_URL as string
const ACTION_DECREMENTED = 'decremented'
const ACTION_INCREMENTED = 'incremented'

type SutTypes = {
  sut: ProductMongoRepo
}

const makeSut = (): SutTypes => {
  const sut = new ProductMongoRepo()
  return {
    sut
  }
}

describe('ProductMongoRepo', () => {
  beforeAll(async () => {
    await MongoHelper.connect(MONGO_URI)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    await ProductModel.deleteMany({})
  })

  describe('LoadByName()', () => {
    test('Should return a product if product exists', async () => {
      const { sut } = makeSut()
      const product = mockProductModel()
      await ProductModel.create(product)
      const result = await sut.loadByName(product.name)
      expect(result).toEqual(product)
    })

    test('Should return null if product not exists', async () => {
      const { sut } = makeSut()
      const product = mockProductModel()
      const result = await sut.loadByName(product.name)
      expect(result).toBeNull()
    })
  })

  describe('updateStock()', () => {
    test('Should product quantity increment value', async () => {
      const { sut } = makeSut()
      const product = mockProductModel()
      const productOrder = {
        ...product,
        quantity: 5
      }
      await ProductModel.create(product)
      await sut.updateStock(ACTION_INCREMENTED, productOrder)
      const result = await ProductModel.findOne({ name: product.name })
      expect(result?.quantity).toBe(product.quantity + productOrder.quantity)
    })

    test('Should product quantity decrement value', async () => {
      const { sut } = makeSut()
      const product = mockProductModel()
      const productOrder = {
        ...product,
        quantity: 5
      }
      await ProductModel.create(product)
      await sut.updateStock(ACTION_DECREMENTED, productOrder)
      const result = await ProductModel.findOne({ name: product.name })
      expect(result?.quantity).toBe(product.quantity - productOrder.quantity)
    })

    test('Should product quantity not decrement if quantity stock is equal 0', async () => {
      const { sut } = makeSut()
      const product = {
        ...mockProductModel(),
        quantity: 0
      }
      const productOrder = {
        ...product,
        quantity: 5
      }
      await ProductModel.create(product)
      await sut.updateStock(ACTION_DECREMENTED, productOrder)
      const result = await ProductModel.findOne({ name: product.name })
      expect(result?.quantity).toBe(0)
    })

    test('Should product quantity increment if initial quantity stock equal 0', async () => {
      const { sut } = makeSut()
      const product = { ...mockProductModel(), quantity: 0 }
      const productOrder = { ...product, quantity: 5 }
      await ProductModel.create(product)
      await sut.updateStock(ACTION_INCREMENTED, productOrder)
      const result = await ProductModel.findOne({ name: product.name })
      expect(result?.quantity).toBe(product.quantity + productOrder.quantity)
    })

    test('Should product quantity decrement if initial quantity stock equal gte 1', async () => {
      const { sut } = makeSut()
      const product = { ...mockProductModel(), quantity: 1 }
      const productOrder = { ...product, quantity: 1 }
      await ProductModel.create(product)
      await sut.updateStock(ACTION_DECREMENTED, productOrder)
      const result = await ProductModel.findOne({ name: product.name })
      expect(result?.quantity).toBe(product.quantity - productOrder.quantity)
    })
  })
})
