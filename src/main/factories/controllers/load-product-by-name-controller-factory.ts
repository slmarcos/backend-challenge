import { LoadProductByNameController } from '@/presentation/controllers'
import { makeLoadProductByName } from '@/main/factories'

export const makeLoadProductByNameController = (): LoadProductByNameController => {
  return new LoadProductByNameController(makeLoadProductByName())
}
