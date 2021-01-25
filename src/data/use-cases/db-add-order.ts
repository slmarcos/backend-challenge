import { AddOrder } from '@/domain/use-cases'
import { AddOrderRepo } from '@/data/protocols'

export class DbAddOrder implements AddOrder {
  constructor (
    private readonly addOrderRepo: AddOrderRepo
  ) { }

  async add (data: AddOrder.Params): Promise<AddOrder.Result> {
    await this.addOrderRepo.add(data)
    return null as unknown as AddOrder.Result
  }
}
