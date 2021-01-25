import { LoadProductByName } from '@/domain/use-cases'

import { mockProductModel } from '@/tests/domain/mocks'

export class LoadProductByNameSpy implements LoadProductByName {
  name!: string
  result = mockProductModel()
  async load (name: string): Promise<LoadProductByName.Result> {
    this.name = name
    return this.result
  }
}
