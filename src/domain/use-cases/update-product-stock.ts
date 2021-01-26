import { ProductOrderModel } from '@/domain/models'

export interface UpdateProductStock {
  update: (action: string, products: ProductOrderModel[]) => Promise<void>
}

export namespace UpdateProductStock { }
