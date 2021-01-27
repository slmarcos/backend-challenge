import { LoadOrderById } from '@/domain/use-cases'

export interface LoadOrderByIdRepo {
  loadById: (id: string) => Promise<LoadOrderByIdRepo.Result>
}

export namespace LoadOrderByIdRepo {
  export type Result = LoadOrderById.Result
}
