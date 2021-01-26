import { LoadProductByNameRepo } from '@/data/protocols'
import { mockProductModel } from '@/tests/domain/mocks'

export class LoadProductByNameRepoSpy implements LoadProductByNameRepo {
  name!: string
  result: LoadProductByNameRepo.Result | null = mockProductModel()

  async loadByName (name: string): Promise<LoadProductByNameRepo.Result> {
    this.name = name
    return this.result
  }
}
