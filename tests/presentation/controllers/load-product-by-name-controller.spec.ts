import { LoadProductByNameController } from '@/presentation/controllers'
import { noContent, ok, serverError } from '@/presentation/helpers'
import { throwError } from '@/tests/domain/mocks'

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

  test('Should returns noContent if LoadProductByName returns null', async () => {
    const { sut, loadProductByNameSpy } = makeSut()
    const request = mockRequest()
    loadProductByNameSpy.result = null
    const response = await sut.handle(request)
    expect(response).toEqual(noContent())
  })

  test('Should returns serverError if LoadProductByName throws', async () => {
    const { sut, loadProductByNameSpy } = makeSut()
    const request = mockRequest()
    jest.spyOn(loadProductByNameSpy, 'load').mockImplementationOnce(throwError)
    const response = await sut.handle(request)
    expect(response).toEqual(serverError(new Error()))
  })

  test('Should returns ok on success', async () => {
    const { sut, loadProductByNameSpy } = makeSut()
    const request = mockRequest()
    const response = await sut.handle(request)
    expect(response).toEqual(ok(loadProductByNameSpy.result))
  })
})
