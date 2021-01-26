import { UpdateProductStockController } from '@/presentation/controllers'
import { UpdateProductStockSpy } from '@/tests/presentation/mocks'

import faker from 'faker'

const ACTION_INCREMENTED = 'incremented'

const mockRequest = (): UpdateProductStockController.Request => ({
  action: ACTION_INCREMENTED,
  content: faker.commerce.productName()
})

type SutTypes = {
  sut: UpdateProductStockController
  updateProductStockSpy: UpdateProductStockSpy
}

const makeSut = (): SutTypes => {
  const updateProductStockSpy = new UpdateProductStockSpy()
  const sut = new UpdateProductStockController(updateProductStockSpy)
  return {
    sut,
    updateProductStockSpy
  }
}

describe('UpdateProductStockController', () => {
  test('Should calls UpdateProductStock use case with correct params', async () => {
    const { sut, updateProductStockSpy } = makeSut()
    const request = mockRequest()
    const products = [{
      name: request.content,
      price: 0,
      quantity: 1
    }]
    await sut.handle(request)
    expect(updateProductStockSpy.action).toBe(request.action)
    expect(updateProductStockSpy.products).toEqual(products)
  })
})
