import { ProductOrderParam } from '@/domain/models'

export interface CheckProductsHasStock {
  check: (products: CheckProductsHasStock.Params) => Promise<CheckProductsHasStock.Result>
}

export namespace CheckProductsHasStock {
  export type Params = ProductOrderParam[]
  export type Result = boolean
}
