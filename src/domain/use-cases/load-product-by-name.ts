import { ProductModel } from '../models/product'

export interface LoadProductByName {
  load: (name: string) => Promise<LoadProductByName.Result>
}

export namespace LoadProductByName {
  export type Result = ProductModel
}
