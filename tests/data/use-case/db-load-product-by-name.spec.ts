import { DbLoadProductByName } from '@/data/use-cases'

import { throwError } from '@/tests/domain/mocks'
import { LoadProductByNameRepoSpy } from '@/tests/data/mocks'

import faker from 'faker'

type SutTypes = {
  sut: DbLoadProductByName
  loadProductByNameRepoSpy: LoadProductByNameRepoSpy
}

const makeSut = (): SutTypes => {
  const loadProductByNameRepoSpy = new LoadProductByNameRepoSpy()
  const sut = new DbLoadProductByName(loadProductByNameRepoSpy)
  return {
    sut,
    loadProductByNameRepoSpy
  }
}

describe('DbLoadProductByName', () => {
  test('Should call LoadProductByNameRepo with correct product name', async () => {
    const { sut, loadProductByNameRepoSpy } = makeSut()
    const productName = faker.commerce.productName()
    await sut.load(productName)
    expect(loadProductByNameRepoSpy.name).toBe(productName)
  })

  test('Should throw if LoadProductByNameRepo throws', async () => {
    const { sut, loadProductByNameRepoSpy } = makeSut()
    jest.spyOn(loadProductByNameRepoSpy, 'loadByName').mockImplementationOnce(throwError)
    const promise = sut.load(faker.commerce.productName())
    await expect(promise).rejects.toThrow()
  })
})
