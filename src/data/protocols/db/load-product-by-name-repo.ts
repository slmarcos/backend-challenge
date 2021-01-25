import { ProductModel } from '@/domain/models'

export interface LoadProductByNameRepo {
  loadByName: (name: string) => Promise<LoadProductByNameRepo.Result>
}

export namespace LoadProductByNameRepo {
  export type Result = ProductModel
}
