import { AddOrder } from '@/domain/use-cases'

export interface AddOrderRepo {
  add: (data: AddOrderRepo.Params) => Promise<AddOrderRepo.Result>
}

export namespace AddOrderRepo {
  export type Params = AddOrder.Params
  export type Result = AddOrder.Result
}
