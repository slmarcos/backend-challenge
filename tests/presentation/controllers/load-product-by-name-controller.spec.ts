import { LoadProductByNameController } from '@/presentation/controllers'

import { LoadProductByNameSpy } from '@/tests/presentation/mocks'

import faker from 'faker'

const mockRequest = (): LoadProductByNameController.Request => ({
  name: faker.commerce.productName()
})

type SutTypes = {
  sut: LoadProductByNameController
  loadProductByNameSpy: LoadProductByNameSpy
}

const makeSut = (): SutTypes => {
  const loadProductByNameSpy = new LoadProductByNameSpy()
  const sut = new LoadProductByNameController(loadProductByNameSpy)
  return {
    sut,
    loadProductByNameSpy
  }
}

describe('LoadProductByNameController', () => {
  test('Should calls LoadProductByName use case with correct product name', async () => {
    const { sut, loadProductByNameSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(loadProductByNameSpy.name).toBe(request.name)
  })
})
