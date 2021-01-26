import { LoadProductsByNames } from '@/domain/use-cases'
import { LoadProductsByNamesRepo } from '@/data/protocols'

export class DbLoadProductsByNames implements LoadProductsByNames {
  constructor (
    private readonly loadProductsByNamesRepo: LoadProductsByNamesRepo
  ) { }

  async load (names: string[]): Promise<LoadProductsByNames.Result> {
    return this.loadProductsByNamesRepo.loadByNames(names)
  }
}
