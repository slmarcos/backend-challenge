import { AddOrder, LoadOrders } from '@/domain/use-cases'

import { mockOrderModel, mockOrders } from '@/tests/domain/mocks'

export class AddOrderSpy implements AddOrder {
  params!: AddOrder.Params
  result = mockOrderModel()

  async add (params: AddOrder.Params): Promise<AddOrder.Result> {
    this.params = params
    return this.result
  }
}

export class LoadOrdersSpy implements LoadOrders {
  result = mockOrders()
  calls = 0

  async load (): Promise<LoadOrders.Result> {
    this.calls++
    return this.result
  }
}
