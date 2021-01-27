import { LoadOrderByIdController } from '@/presentation/controllers'
import { makeLoadOrderById } from '@/main/factories/use-cases'

export const makeLoadOrderByIdController = (): LoadOrderByIdController => {
  return new LoadOrderByIdController(makeLoadOrderById())
}
