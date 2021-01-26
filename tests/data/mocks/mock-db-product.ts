import { LoadProductByNameRepo, UpdateProductStockRepo } from '@/data/protocols'
import { mockProductModel } from '@/tests/domain/mocks'

export class LoadProductByNameRepoSpy implements LoadProductByNameRepo {
  name!: string
  result: LoadProductByNameRepo.Result | null = mockProductModel()

  async loadByName (name: string): Promise<LoadProductByNameRepo.Result> {
    this.name = name
    return this.result
  }
}

export class UpdateProductStockRepoSpy implements UpdateProductStockRepo {
  action!: string
  product!: UpdateProductStockRepo.Product

  async updateStock (action: string, product: UpdateProductStockRepo.Product): Promise<void> {
    this.action = action
    this.product = product
  }
}
