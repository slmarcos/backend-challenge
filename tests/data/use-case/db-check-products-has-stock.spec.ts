import { DbCheckProductsHasStock } from '@/data/use-cases'

import { LoadProductByNameRepoSpy } from '@/tests/data/mocks'
import { mockProductsOrderParams, throwError } from '@/tests/domain/mocks'

type SutTypes = {
  sut: DbCheckProductsHasStock
  loadProductByNameRepoSpy: LoadProductByNameRepoSpy
}

const makeSut = (): SutTypes => {
  const loadProductByNameRepoSpy = new LoadProductByNameRepoSpy()
  const sut = new DbCheckProductsHasStock(loadProductByNameRepoSpy)
  return {
    sut,
    loadProductByNameRepoSpy
  }
}

describe('DbCheckProductsHasStock', () => {
  test('Should calls LoadProductByNameRepo with correct params', async () => {
    const { sut, loadProductByNameRepoSpy } = makeSut()
    const params = mockProductsOrderParams()
    await sut.check(params)
    expect(loadProductByNameRepoSpy.name).toBe(params[1].name)
  })

  test('Should throw if LoadProductByNameRepo throws', async () => {
    const { sut, loadProductByNameRepoSpy } = makeSut()
    jest.spyOn(loadProductByNameRepoSpy, 'loadByName').mockImplementationOnce(throwError)
    const promise = sut.check(mockProductsOrderParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should return false if no have product in stock', async () => {
    const { sut } = makeSut()
    const params = mockProductsOrderParams()
    params[0].quantity = 200
    const hasStock = await sut.check(params)
    expect(hasStock).toBe(false)
  })

  test('Should return false if product not exists', async () => {
    const { sut, loadProductByNameRepoSpy } = makeSut()
    loadProductByNameRepoSpy.result = null
    const params = mockProductsOrderParams()
    const hasStock = await sut.check(params)
    expect(hasStock).toBe(false)
  })

  test('Should return true on success', async () => {
    const { sut } = makeSut()
    const hasStock = await sut.check(mockProductsOrderParams())
    expect(hasStock).toBe(true)
  })
})
