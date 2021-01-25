import { ProductModel } from './product'

export type OrderModel = {
  id: string
  products: ProductModel[]
  total: number
}
