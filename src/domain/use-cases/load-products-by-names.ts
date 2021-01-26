import { ProductModel } from '@/domain/models'

export interface LoadProductsByNames {
  load: (products: LoadProductsByNames.Params) => Promise<LoadProductsByNames.Result>
}

export namespace LoadProductsByNames {
  export type Params = string[]
  export type Result = ProductModel[]
}
