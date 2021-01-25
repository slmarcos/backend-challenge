import { DbLoadProductByName } from '@/data/use-cases'

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
})
