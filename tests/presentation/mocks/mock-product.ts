import { ProductModel } from '@/domain/models'
import { LoadProductByName } from '@/domain/use-cases'

import { mockProductModel } from '@/tests/domain/mocks'

export class LoadProductByNameSpy implements LoadProductByName {
  name!: string
  result: ProductModel | null = mockProductModel()
  async load (name: string): Promise<LoadProductByName.Result> {
    this.name = name
    return this.result
  }
}
