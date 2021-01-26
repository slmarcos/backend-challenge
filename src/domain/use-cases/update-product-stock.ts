import { ProductOrderParam } from '@/domain/models'

export interface UpdateProductStock {
  update: (action: string, products: ProductOrderParam[]) => Promise<void>
}

export namespace UpdateProductStock { }
