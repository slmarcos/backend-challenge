import { LoadOrderByIdController } from '@/presentation/controllers'
import { noContent, ok, serverError } from '@/presentation/helpers'
import { throwError } from '@/tests/domain/mocks'

import { LoadOrderByIdSpy } from '@/tests/presentation/mocks'

import faker from 'faker'

const mockRequest = (): LoadOrderByIdController.Request => ({
  id: faker.random.uuid()
})

type SutTypes = {
  sut: LoadOrderByIdController
  loadOrderByIdSpy: LoadOrderByIdSpy
}

const makeSut = (): SutTypes => {
  const loadOrderByIdSpy = new LoadOrderByIdSpy()
  const sut = new LoadOrderByIdController(loadOrderByIdSpy)
  return {
    sut,
    loadOrderByIdSpy
  }
}

describe('LoadOrderByIdController', () => {
  test('Should calls LoadOrderById use case with correct id', async () => {
    const { sut, loadOrderByIdSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(loadOrderByIdSpy.id).toBe(request.id)
  })

  test('Should returns noContent if LoadOrderById returns null', async () => {
    const { sut, loadOrderByIdSpy } = makeSut()
    const request = mockRequest()
    loadOrderByIdSpy.result = null
    const response = await sut.handle(request)
    expect(response).toEqual(noContent())
  })

  test('Should returns serverError if LoadOrderById throws', async () => {
    const { sut, loadOrderByIdSpy } = makeSut()
    const request = mockRequest()
    jest.spyOn(loadOrderByIdSpy, 'loadById').mockImplementationOnce(throwError)
    const response = await sut.handle(request)
    expect(response).toEqual(serverError(new Error()))
  })

  test('Should returns ok on success', async () => {
    const { sut, loadOrderByIdSpy } = makeSut()
    const request = mockRequest()
    const response = await sut.handle(request)
    expect(response).toEqual(ok(loadOrderByIdSpy.result))
  })
})
