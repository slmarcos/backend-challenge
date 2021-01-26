import { DbLoadOrders } from '@/data/use-cases'

import { LoadOrdersRepoSpy } from '@/tests/data/mocks'
import { throwError } from '@/tests/domain/mocks'

type SutTypes = {
  sut: DbLoadOrders
  loadOrdersRepoSpy: LoadOrdersRepoSpy
}

const makeSut = (): SutTypes => {
  const loadOrdersRepoSpy = new LoadOrdersRepoSpy()
  const sut = new DbLoadOrders(loadOrdersRepoSpy)
  return {
    sut,
    loadOrdersRepoSpy
  }
}

describe('DbLoadOrders', () => {
  test('Should calls LoadOrdersRepo', async () => {
    const { sut, loadOrdersRepoSpy } = makeSut()
    await sut.load()
    expect(loadOrdersRepoSpy.calls).toBe(1)
  })

  test('Should throw if LoadOrdersRepo throws', async () => {
    const { sut, loadOrdersRepoSpy } = makeSut()
    jest.spyOn(loadOrdersRepoSpy, 'load').mockImplementationOnce(throwError)
    const promise = sut.load()
    await expect(promise).rejects.toThrow()
  })

  test('Should returns Orders on success', async () => {
    const { sut, loadOrdersRepoSpy } = makeSut()
    const orders = await sut.load()
    expect(loadOrdersRepoSpy.result).toBe(orders)
  })
})
