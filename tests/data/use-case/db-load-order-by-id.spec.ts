import { DbLoadOrderById } from '@/data/use-cases'

import { LoadOrderByIdRepoSpy } from '@/tests/data/mocks'
import { throwError } from '@/tests/domain/mocks'

import faker from 'faker'

type SutTypes = {
  sut: DbLoadOrderById
  loadOrderByIdRepoSpy: LoadOrderByIdRepoSpy
}

const makeSut = (): SutTypes => {
  const loadOrderByIdRepoSpy = new LoadOrderByIdRepoSpy()
  const sut = new DbLoadOrderById(loadOrderByIdRepoSpy)
  return {
    sut,
    loadOrderByIdRepoSpy
  }
}

describe('DbLoadOrderById', () => {
  test('Should calls LoadOrderByIdRepo', async () => {
    const { sut, loadOrderByIdRepoSpy } = makeSut()
    const idParam = faker.random.uuid()
    await sut.loadById(idParam)
    expect(loadOrderByIdRepoSpy.id).toBe(idParam)
  })

  test('Should throw if LoadOrderByIdRepo throws', async () => {
    const { sut, loadOrderByIdRepoSpy } = makeSut()
    jest.spyOn(loadOrderByIdRepoSpy, 'loadById').mockImplementationOnce(throwError)
    const promise = sut.loadById(faker.random.uuid())
    await expect(promise).rejects.toThrow()
  })

  test('Should returns null if order not found', async () => {
    const { sut, loadOrderByIdRepoSpy } = makeSut()
    loadOrderByIdRepoSpy.result = null
    const order = await sut.loadById(faker.random.uuid())
    expect(order).toBeNull()
  })

  test('Should returns Order on success', async () => {
    const { sut, loadOrderByIdRepoSpy } = makeSut()
    const order = await sut.loadById(faker.random.uuid())
    expect(loadOrderByIdRepoSpy.result).toBe(order)
  })
})
