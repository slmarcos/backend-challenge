import { adaptRoute } from '@/main/adapters'
import { makeAddOrderController } from '@/main/factories'

import { Router } from 'express'

export default (router: Router): void => {
  router.get('/orders', adaptRoute(makeAddOrderController()))
}
