import { LoadOrderByIdController } from '@/presentation/controllers'
import { badRequest, noContent, ok, serverError } from '@/presentation/helpers'
import { throwError } from '@/tests/domain/mocks'

import { LoadOrderByIdSpy, ValidatorSpy } from '@/tests/presentation/mocks'

import faker from 'faker'

const mockRequest = (): LoadOrderByIdController.Request => ({
  id: faker.random.uuid()
})

type SutTypes = {
  sut: LoadOrderByIdController
  validatorSpy: ValidatorSpy
  loadOrderByIdSpy: LoadOrderByIdSpy
}

const makeSut = (): SutTypes => {
  const validatorSpy = new ValidatorSpy()
  const loadOrderByIdSpy = new LoadOrderByIdSpy()
  const sut = new LoadOrderByIdController(validatorSpy, loadOrderByIdSpy)
  return {
    sut,
    validatorSpy,
    loadOrderByIdSpy
  }
}

describe('LoadOrderByIdController', () => {
  test('Should call Validator with correct values', async () => {
    const { sut, validatorSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(validatorSpy.input).toEqual(request)
  })

  test('Should return badRequest if Validator fails', async () => {
    const { sut, validatorSpy } = makeSut()
    validatorSpy.error = new Error()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(badRequest(validatorSpy.error))
  })

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
