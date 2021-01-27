import { LoadOrderById } from '@/domain/use-cases'
import { LoadOrderByIdRepo } from '@/data/protocols'

export class DbLoadOrderById implements LoadOrderById {
  constructor (
    private readonly loadOrderByIdRepo: LoadOrderByIdRepo
  ) { }

  async loadById (id: string): Promise<LoadOrderById.Result> {
    return this.loadOrderByIdRepo.loadById(id)
  }
}
