import { AddOrderRepo, LoadOrdersRepo } from '@/data/protocols'
import { OrderModel } from '@/infra/db/models'

export class OrderMongoRepo implements AddOrderRepo, LoadOrdersRepo {
  async add (data: AddOrderRepo.Params): Promise<AddOrderRepo.Result> {
    const order = await OrderModel.create(data)
    return {
      id: order.id,
      products: order.products,
      total: order.products.reduce((acc, value) => acc + (value.price * value.quantity), 0)
    }
  }

  async load (): Promise<LoadOrdersRepo.Result> {
    const orders = await OrderModel.aggregate([
      {
        $unwind: {
          path: '$products'
        }
      },
      {
        $project: {
          products: 1,
          totalProd: {
            $multiply: ['$products.price', '$products.quantity']
          }
        }
      },
      {
        $group: {
          _id: '$_id',
          products: {
            $push: {
              name: '$products.name',
              price: '$products.price',
              quantity: '$products.quantity'
            }
          },
          total: {
            $sum: '$totalProd'
          }
        }
      },
      {
        $group: {
          _id: 0,
          orders: {
            $push: {
              id: '$_id',
              products: '$products',
              total: '$total'
            }
          }
        }
      },
      {
        $project: {
          _id: 0,
          orders: 1
        }
      }
    ]
    ).exec()
    return orders[0] || { orders: [] }
  }
}
