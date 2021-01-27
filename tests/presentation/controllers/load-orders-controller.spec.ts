import { LoadOrdersController } from '@/presentation/controllers'
import { ok, serverError } from '@/presentation/helpers'
import { throwError } from '@/tests/domain/mocks'

import { LoadOrdersSpy } from '@/tests/presentation/mocks'

type SutTypes = {
  sut: LoadOrdersController
  loadOrdersSpy: LoadOrdersSpy
}

const makeSut = (): SutTypes => {
  const loadOrdersSpy = new LoadOrdersSpy()
  const sut = new LoadOrdersController(loadOrdersSpy)
  return {
    sut,
    loadOrdersSpy
  }
}

describe('LoadProductByNameController', () => {
  test('Should calls LoadOrders use case', async () => {
    const { sut, loadOrdersSpy } = makeSut()
    await sut.handle()
    expect(loadOrdersSpy.calls).toBe(1)
  })

  test('Should returns serverError if LoadOrders throws', async () => {
    const { sut, loadOrdersSpy } = makeSut()
    jest.spyOn(loadOrdersSpy, 'load').mockImplementationOnce(throwError)
    const response = await sut.handle()
    expect(response).toEqual(serverError(new Error()))
  })

  test('Should returns ok on success', async () => {
    const { sut, loadOrdersSpy } = makeSut()
    const response = await sut.handle()
    expect(response).toEqual(ok(loadOrdersSpy.result))
  })
})
