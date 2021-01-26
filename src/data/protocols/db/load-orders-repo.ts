import { LoadOrders } from '@/domain/use-cases'

export interface LoadOrdersRepo {
  load: () => Promise<LoadOrdersRepo.Result>
}

export namespace LoadOrdersRepo {
  export type Result = LoadOrders.Result
}
