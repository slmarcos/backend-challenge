import { AddOrderRepo, LoadOrderByIdRepo, LoadOrdersRepo } from '@/data/protocols'
import { OrderParams } from '@/domain/models'
import { LoadOrders } from '@/domain/use-cases'

import { mockOrderModel, mockOrders } from '@/tests/domain/mocks'

export class AddOrderRepoSpy implements AddOrderRepo {
  params!: AddOrderRepo.Params
  order!: OrderParams
  result = mockOrderModel()

  async add (data: AddOrderRepo.Params): Promise<AddOrderRepo.Result> {
    this.params = data
    this.order = {
      products: data.products.map((item) => ({ ...item, price: 5 }))
    }
    return this.result
  }
}

export class LoadOrdersRepoSpy implements LoadOrdersRepo {
  result = mockOrders()
  calls = 0

  async load (): Promise<LoadOrders.Result> {
    this.calls++
    return this.result
  }
}

export class LoadOrderByIdRepoSpy implements LoadOrderByIdRepo {
  id!: string
  result: LoadOrderByIdRepo.Result = mockOrderModel()

  async loadById (id: string): Promise<LoadOrderByIdRepo.Result> {
    this.id = id
    return this.result
  }
}
