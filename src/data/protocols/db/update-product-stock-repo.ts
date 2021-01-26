import { ProductModel } from '@/domain/models'

export interface UpdateProductStockRepo {
  updateStock: (action: string, product: UpdateProductStockRepo.Product) => Promise<void>
}

export namespace UpdateProductStockRepo {
  export type Product = ProductModel
}
