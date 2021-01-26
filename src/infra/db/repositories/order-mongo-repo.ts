import { AddOrderRepo } from '@/data/protocols'
import { OrderModel } from '@/infra/db/models'

export class OrderMongoRepo implements AddOrderRepo {
  async add (data: AddOrderRepo.Params): Promise<AddOrderRepo.Result> {
    const order = await OrderModel.create(data)
    return {
      id: order.id,
      products: order.products,
      total: order.products.reduce((acc, value) => acc + (value.price * value.quantity), 0)
    }
  }
}
