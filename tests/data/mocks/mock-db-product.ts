import { LoadProductByNameRepo, LoadProductsByNamesRepo } from '@/data/protocols'
import { mockProductModel, mockProductModels } from '@/tests/domain/mocks'

export class LoadProductByNameRepoSpy implements LoadProductByNameRepo {
  name!: string
  result = mockProductModel()

  async loadByName (name: string): Promise<LoadProductByNameRepo.Result> {
    this.name = name
    return this.result
  }
}

export class LoadProductsByNamesRepoSpy implements LoadProductsByNamesRepo {
  names!: string[]
  result = mockProductModels()

  async loadByNames (names: string[]): Promise<LoadProductsByNamesRepo.Result> {
    this.names = names
    return this.result
  }
}
