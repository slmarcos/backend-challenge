import { adaptRoute } from '@/main/adapters'
import { makeLoadProductByNameController } from '@/main/factories'

import { Router } from 'express'

export default (router: Router): void => {
  router.get('/products/:name', adaptRoute(makeLoadProductByNameController()))
}
