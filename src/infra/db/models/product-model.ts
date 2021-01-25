import { Document, Model, model, Schema } from 'mongoose'

interface Product {
  name: string
  price: number
  quantity: number
}

interface ProductDocument extends Document, Product { }
interface ProductModel extends Model<ProductDocument> { }

const ProductSchema = new Schema<ProductDocument, ProductModel>({
  name: {
    type: String,
    required: true,
    unique: true
  },
  price: {
    type: Number,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  }
})

export default model<ProductDocument, ProductModel>('Product', ProductSchema)
