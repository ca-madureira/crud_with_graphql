import { Schema, model, Document, Types } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  description: string;
  category: Schema.Types.ObjectId;
  price: number;
  stock: number;
  images: string[];
}

const productSchema = new Schema<IProduct>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },

  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  images: [{ type: String }],
});

const ProductModel = model<IProduct>('Product', productSchema);

export default ProductModel;
