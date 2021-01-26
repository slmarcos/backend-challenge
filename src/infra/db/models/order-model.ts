import { Document, Model, model, Schema } from 'mongoose'

interface OrderProduct {
  name: string
  price: number
  quantity: number
}

interface Order {
  products: OrderProduct[]
}

interface OrderDocument extends Document, Order { }
interface OrderModel extends Model<OrderDocument> { }

const OrderSchema = new Schema<OrderDocument, OrderModel>({
  products: [{
    _id: false,
    name: String,
    price: Number,
    quantity: Number
  }]
})

export default model<OrderDocument, OrderModel>('Order', OrderSchema)
