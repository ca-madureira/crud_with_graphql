import { Schema, model, Document } from 'mongoose';

interface ICategory extends Document {
  name: string;
}

const categorySchema = new Schema<ICategory>({
  name: {
    type: String,
    required: true,
  },
});

const CategoryModel = model<ICategory>('Category', categorySchema);

export default CategoryModel;
