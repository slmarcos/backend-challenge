import { AddOrder } from '@/domain/use-cases'

import { mockOrderModel } from '@/tests/domain/mocks'

export class AddOrderSpy implements AddOrder {
  params!: AddOrder.Params
  result = mockOrderModel()

  async add (params: AddOrder.Params): Promise<AddOrder.Result> {
    this.params = params
    return this.result
  }
}
