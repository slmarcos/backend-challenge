import { OrderModel, OrderParams } from '@/domain/models'

export interface AddOrder {
  add: (data: AddOrder.Params) => Promise<AddOrder.Result>
}

export namespace AddOrder {
  export type Params = OrderParams
  export type Result = OrderModel
}
