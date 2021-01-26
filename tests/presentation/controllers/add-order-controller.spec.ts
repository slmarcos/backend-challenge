import { AddOrderController } from '@/presentation/controllers'
import { ok, serverError } from '@/presentation/helpers'
import { mockOrderParams, throwError } from '@/tests/domain/mocks'
import { AddOrderSpy, CheckProductsHasStockSpy } from '@/tests/presentation/mocks'

const mockRequest = (): AddOrderController.Request => mockOrderParams()

type SutTypes = {
  sut: AddOrderController
  checkProductsHasStockSpy: CheckProductsHasStockSpy
  addOrderSpy: AddOrderSpy
}

const makeSut = (): SutTypes => {
  const checkProductsHasStockSpy = new CheckProductsHasStockSpy()
  const addOrderSpy = new AddOrderSpy()
  const sut = new AddOrderController(checkProductsHasStockSpy, addOrderSpy)
  return {
    sut,
    checkProductsHasStockSpy,
    addOrderSpy
  }
}

describe('AddOrderController', () => {
  test('Should calls CheckProductsHasStock use case with correct params', async () => {
    const { sut, checkProductsHasStockSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(checkProductsHasStockSpy.params).toEqual(request.products)
  })

  test('Should returns ok with stock unavailable message if CheckProductsHasStock returns false', async () => {
    const { sut, checkProductsHasStockSpy } = makeSut()
    const request = mockRequest()
    checkProductsHasStockSpy.result = false
    const response = await sut.handle(request)
    expect(response).toEqual(ok({
      message: 'stock unavailable'
    }))
  })

  test('Should calls AddOrder use case with correct params', async () => {
    const { sut, addOrderSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(addOrderSpy.params).toEqual(request)
  })

  test('Should returns ok with order on success', async () => {
    const { sut, addOrderSpy } = makeSut()
    const request = mockRequest()
    const response = await sut.handle(request)
    expect(response).toEqual(ok(addOrderSpy.result))
  })

  test('Should returns serverError if CheckProductsHasStock throws', async () => {
    const { sut, checkProductsHasStockSpy } = makeSut()
    jest.spyOn(checkProductsHasStockSpy, 'check').mockImplementationOnce(throwError)
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(serverError(new Error()))
  })

  test('Should returns serverError if AddOrder throws', async () => {
    const { sut, addOrderSpy } = makeSut()
    jest.spyOn(addOrderSpy, 'add').mockImplementationOnce(throwError)
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(serverError(new Error()))
  })
})
