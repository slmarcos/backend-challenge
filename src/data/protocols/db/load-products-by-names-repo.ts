import { ProductModel } from '@/domain/models'

export interface LoadProductsByNamesRepo {
  loadByNames: (names: string[]) => Promise<LoadProductsByNamesRepo.Result>
}

export namespace LoadProductsByNamesRepo {
  export type Result = ProductModel[]
}
