import { AddOrderRepo, LoadOrderByIdRepo, LoadOrdersRepo } from '@/data/protocols'
import { OrderModel } from '@/infra/db/models'

import { mongo } from 'mongoose'

export class OrderMongoRepo implements AddOrderRepo, LoadOrdersRepo, LoadOrderByIdRepo {
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
              total: {
                $round: ['$total', 2]
              }
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

  async loadById (id: string): Promise<LoadOrderByIdRepo.Result> {
    const order = await OrderModel.aggregate([
      {
        $match: {
          _id: new mongo.ObjectID(id)
        }
      },
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
        $project: {
          _id: 0,
          id: '$_id',
          products: 1,
          total: {
            $round: ['$total', 2]
          }
        }
      }
    ]).exec()
    return order[0] || null
  }
}
