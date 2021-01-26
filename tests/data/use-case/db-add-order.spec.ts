import { DbAddOrder } from '@/data/use-cases'

import { AddOrderRepoSpy, LoadProductByNameRepoSpy } from '@/tests/data/mocks'
import { mockOrderParams, throwError } from '@/tests/domain/mocks'

type SutTypes = {
  sut: DbAddOrder
  loadProductByNameRepoSpy: LoadProductByNameRepoSpy
  addOrderRepoSpy: AddOrderRepoSpy
}

const makeSut = (): SutTypes => {
  const loadProductByNameRepoSpy = new LoadProductByNameRepoSpy()
  const addOrderRepoSpy = new AddOrderRepoSpy()
  const sut = new DbAddOrder(loadProductByNameRepoSpy, addOrderRepoSpy)
  return {
    sut,
    loadProductByNameRepoSpy,
    addOrderRepoSpy
  }
}

describe('DbAddOrder', () => {
  test('Should calls LoadProductByNameRepo with correct params', async () => {
    const { sut, loadProductByNameRepoSpy } = makeSut()
    const params = mockOrderParams()
    await sut.add(params)
    expect(loadProductByNameRepoSpy.name).toBe(params.products[1].name)
  })

  test('Should throw if LoadProductByNameRepo throws', async () => {
    const { sut, loadProductByNameRepoSpy } = makeSut()
    jest.spyOn(loadProductByNameRepoSpy, 'loadByName').mockImplementationOnce(throwError)
    const promise = sut.add(mockOrderParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should calls AddOrderRepo with correct params', async () => {
    const { sut, addOrderRepoSpy } = makeSut()
    const params = mockOrderParams()
    await sut.add(params)
    const addOrderParam = {
      products: params.products.map((item) => ({ ...item, price: 5 }))
    }
    expect(addOrderRepoSpy.order).toEqual(addOrderParam)
  })

  test('Should throw if AddOrderRepo throws', async () => {
    const { sut, addOrderRepoSpy } = makeSut()
    jest.spyOn(addOrderRepoSpy, 'add').mockImplementationOnce(throwError)
    const promise = sut.add(mockOrderParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should return OrderModel on success', async () => {
    const { sut, addOrderRepoSpy } = makeSut()
    const order = await sut.add(mockOrderParams())
    expect(order).toEqual(addOrderRepoSpy.result)
  })
})
