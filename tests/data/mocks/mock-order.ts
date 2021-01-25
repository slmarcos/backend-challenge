import { AddOrderRepo } from '@/data/protocols'

import { mockOrderModel } from '@/tests/domain/mocks'

export class AddOrderRepoSpy implements AddOrderRepo {
  params!: AddOrderRepo.Params
  result = mockOrderModel()

  async add (data: AddOrderRepo.Params): Promise<AddOrderRepo.Result> {
    this.params = data
    return this.result
  }
}
