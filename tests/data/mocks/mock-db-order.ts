import { AddOrderRepo } from '@/data/protocols'
import { OrderParams } from '@/domain/models'

import { mockOrderModel } from '@/tests/domain/mocks'

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
