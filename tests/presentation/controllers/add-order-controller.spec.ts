import { AddOrderController } from '@/presentation/controllers'
import { badRequest, ok, serverError } from '@/presentation/helpers'
import { mockOrderParams, throwError } from '@/tests/domain/mocks'
import { AddOrderSpy, CheckProductsHasStockSpy, UpdateProductStockSpy, ValidatorSpy } from '@/tests/presentation/mocks'

const mockRequest = (): AddOrderController.Request => mockOrderParams()

type SutTypes = {
  sut: AddOrderController
  validatorSpy: ValidatorSpy
  checkProductsHasStockSpy: CheckProductsHasStockSpy
  addOrderSpy: AddOrderSpy
  updateProductStock: UpdateProductStockSpy
}

const makeSut = (): SutTypes => {
  const validatorSpy = new ValidatorSpy()
  const checkProductsHasStockSpy = new CheckProductsHasStockSpy()
  const addOrderSpy = new AddOrderSpy()
  const updateProductStock = new UpdateProductStockSpy()
  const sut = new AddOrderController(validatorSpy, checkProductsHasStockSpy, addOrderSpy, updateProductStock)
  return {
    sut,
    validatorSpy,
    checkProductsHasStockSpy,
    addOrderSpy,
    updateProductStock
  }
}

describe('AddOrderController', () => {
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

  test('Should calls UpdateProductStock use case with correct params', async () => {
    const { sut, updateProductStock } = makeSut()
    const request = mockRequest()
    const ACTION_DECREMENTED = 'decremented'
    await sut.handle(request)
    expect(updateProductStock.action).toBe(ACTION_DECREMENTED)
    expect(updateProductStock.products).toEqual(request.products)
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

  test('Should returns serverError if UpdateProductStock throws', async () => {
    const { sut, updateProductStock } = makeSut()
    jest.spyOn(updateProductStock, 'update').mockImplementationOnce(throwError)
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(serverError(new Error()))
  })
})
