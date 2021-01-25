import { LoadProductByName } from '@/domain/use-cases'
import { LoadProductByNameRepo } from '@/data/protocols'

export class DbLoadProductByName implements LoadProductByName {
  constructor (
    private readonly loadProductByNameRepo: LoadProductByNameRepo
  ) { }

  async load (name: string): Promise<LoadProductByName.Result> {
    return this.loadProductByNameRepo.loadByName(name)
  }
}
