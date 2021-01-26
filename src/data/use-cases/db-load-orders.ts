import { LoadOrdersRepo } from '@/data/protocols'
import { LoadOrders } from '@/domain/use-cases'

export class DbLoadOrders implements LoadOrders {
  constructor (
    private readonly loadOrdersRepo: LoadOrdersRepo
  ) { }

  async load (): Promise<LoadOrders.Result> {
    return this.loadOrdersRepo.load()
  }
}
