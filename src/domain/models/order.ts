import { ProductOrderModel, ProductOrderParam } from './product'

export type OrderParams = {
  products: ProductOrderParam[]
}

export type OrderToSave = {
  products: ProductOrderModel[]
}

export type OrderModel = {
  id: string
  products: ProductOrderModel[]
  total: number
}
