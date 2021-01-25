import { DbAddOrder } from '@/data/use-cases'
import { AddOrderRepoSpy } from '@/tests/data/mocks'
import { mockOrderParams } from '@/tests/domain/mocks'

type SutTypes = {
  sut: DbAddOrder
  addOrderRepoSpy: AddOrderRepoSpy
}

const makeSut = (): SutTypes => {
  const addOrderRepoSpy = new AddOrderRepoSpy()
  const sut = new DbAddOrder(addOrderRepoSpy)
  return {
    sut,
    addOrderRepoSpy
  }
}

describe('DbAddOrder', () => {
  test('Should calls AddOrderRepo with correct params', async () => {
    const { sut, addOrderRepoSpy } = makeSut()
    const params = mockOrderParams()
    await sut.add(params)
    expect(addOrderRepoSpy.params).toEqual(params)
  })
})
