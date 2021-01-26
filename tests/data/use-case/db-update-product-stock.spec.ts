import { DbUpdateProductStock } from '@/data/use-cases'

import { UpdateProductStockRepoSpy } from '@/tests/data/mocks'
import { mockProductModel, throwError } from '@/tests/domain/mocks'

const ACTION_DECREMENTED = 'decremented'
const ACTION_INCREMENTED = 'incremented'

type SutTypes = {
  sut: DbUpdateProductStock
  updateProductStockRepoSpy: UpdateProductStockRepoSpy
}

const makeSut = (): SutTypes => {
  const updateProductStockRepoSpy = new UpdateProductStockRepoSpy()
  const sut = new DbUpdateProductStock(updateProductStockRepoSpy)
  return {
    sut,
    updateProductStockRepoSpy
  }
}

describe('DbUpdateProductStock', () => {
  test('Should calls UpdateProductStockRepo with correct params', async () => {
    const { sut, updateProductStockRepoSpy } = makeSut()
    const action = ACTION_INCREMENTED
    const products = [mockProductModel(), mockProductModel()]
    await sut.update(action, products)
    expect(updateProductStockRepoSpy.action).toBe(action)
    expect(updateProductStockRepoSpy.product).toEqual(products[1])
  })

  test('Should throw if UpdateProductStockRepo throws', async () => {
    const { sut, updateProductStockRepoSpy } = makeSut()
    jest.spyOn(updateProductStockRepoSpy, 'updateStock').mockImplementationOnce(throwError)
    const action = ACTION_DECREMENTED
    const products = [mockProductModel(), mockProductModel()]
    const promise = sut.update(action, products)
    await expect(promise).rejects.toThrow()
  })

  test('Should return void on success', async () => {
    const { sut } = makeSut()
    const action = ACTION_INCREMENTED
    const products = [mockProductModel(), mockProductModel()]
    const result = await sut.update(action, products)
    expect(result).toBeUndefined()
  })
})
