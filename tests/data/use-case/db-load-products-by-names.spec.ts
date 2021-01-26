import { DbLoadProductsByNames } from '@/data/use-cases'

import { throwError } from '@/tests/domain/mocks'
import { LoadProductsByNamesRepoSpy } from '@/tests/data/mocks'

import faker from 'faker'

type SutTypes = {
  sut: DbLoadProductsByNames
  loadProductsByNamesRepoSpy: LoadProductsByNamesRepoSpy
}

const makeSut = (): SutTypes => {
  const loadProductsByNamesRepoSpy = new LoadProductsByNamesRepoSpy()
  const sut = new DbLoadProductsByNames(loadProductsByNamesRepoSpy)
  return {
    sut,
    loadProductsByNamesRepoSpy
  }
}

describe('DbLoadProductByName', () => {
  test('Should call LoadProductsByNamesRepo with the correct products names', async () => {
    const { sut, loadProductsByNamesRepoSpy } = makeSut()
    const params = [faker.commerce.productName()]
    await sut.load(params)
    expect(loadProductsByNamesRepoSpy.names).toBe(params)
  })

  test('Should throw if LoadProductsByNamesRepo throws', async () => {
    const { sut, loadProductsByNamesRepoSpy } = makeSut()
    jest.spyOn(loadProductsByNamesRepoSpy, 'loadByNames').mockImplementationOnce(throwError)
    const promise = sut.load([faker.commerce.productName()])
    await expect(promise).rejects.toThrow()
  })

  test('Should return an array of ProductModel on success', async () => {
    const { sut, loadProductsByNamesRepoSpy } = makeSut()
    const params = [
      faker.commerce.productName(),
      faker.commerce.productName()
    ]
    const products = await sut.load(params)
    expect(loadProductsByNamesRepoSpy.result).toEqual(products)
  })
})
