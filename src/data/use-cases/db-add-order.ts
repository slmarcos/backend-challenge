import { AddOrderRepo, LoadProductByNameRepo } from '@/data/protocols'
import { AddOrder } from '@/domain/use-cases'
import { ProductOrderModel } from '@/domain/models'

export class DbAddOrder implements AddOrder {
  constructor (
    private readonly loadProductByNameRepo: LoadProductByNameRepo,
    private readonly addOrderRepo: AddOrderRepo
  ) { }

  async add (data: AddOrder.Params): Promise<AddOrder.Result> {
    const products: ProductOrderModel[] = []
    for (const item of data.products) {
      const product = await this.loadProductByNameRepo.loadByName(item.name)
      products.push({
        name: item.name,
        price: product?.price!,
        quantity: item.quantity
      })
    }
    return this.addOrderRepo.add({ products })
  }
}
