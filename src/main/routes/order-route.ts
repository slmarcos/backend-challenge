import { adaptRoute } from '@/main/adapters'
import { makeAddOrderController, makeLoadOrderByIdController, makeLoadOrdersController } from '@/main/factories'

import { Router } from 'express'

export default (router: Router): void => {
  router.post('/orders', adaptRoute(makeAddOrderController()))
  router.get('/orders', adaptRoute(makeLoadOrdersController()))
  router.get('/orders/:id', adaptRoute(makeLoadOrderByIdController()))
}
