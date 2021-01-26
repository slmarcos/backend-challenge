export type ProductModel = {
  name: string
  price: number
  quantity: number
}

export type ProductOrderModel = ProductModel

export type ProductOrderParam = {
  name: string
  quantity: number
}
