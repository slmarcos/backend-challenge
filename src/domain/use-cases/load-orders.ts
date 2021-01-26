import { OrderModel } from '@/domain/models'

export interface LoadOrders {
  load: () => Promise<LoadOrders.Result>
}

export namespace LoadOrders {
  export type Result = {
    orders: OrderModel[]
  }
}
