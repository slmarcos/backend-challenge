import { ProductModel } from '@/domain/models'

export interface UpdateProductStockRepo {
  update: (action: string, product: ProductModel) => Promise<void>
}

export namespace UpdateProductStockRepo { }
