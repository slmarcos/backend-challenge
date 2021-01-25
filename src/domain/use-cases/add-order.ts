import { OrderModel } from '@/domain/models/order'

export interface AddOrder {
  add: (data: AddOrder.Params) => Promise<AddOrder.Result>
}

export namespace AddOrder {
  export type Params = {
    products: Array<{
      name: string
      quantity: number
    }>
  }

  export type Result = OrderModel
}
