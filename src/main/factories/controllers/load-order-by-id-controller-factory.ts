import { LoadOrderByIdController } from '@/presentation/controllers'
import { makeLoadOrderByIdValidator, makeLoadOrderById } from '@/main/factories'

export const makeLoadOrderByIdController = (): LoadOrderByIdController => {
  return new LoadOrderByIdController(makeLoadOrderByIdValidator(), makeLoadOrderById())
}
