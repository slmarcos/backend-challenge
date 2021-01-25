import { ProductMongoRepo } from '@/infra/db/repositories'
import { MongoHelper } from '@/infra/db/helpers'
import { ProductModel } from '@/infra/db/models'
import { mockProductModel } from '@/tests/domain/mocks'

const MONGO_URI = process.env.MONGO_URL as string

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
})
