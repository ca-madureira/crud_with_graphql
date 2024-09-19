import ProductModel from '../models/product.model';
import CategoryModel from '../models/category.model';

const productResolvers = {
  Query: {
    getProducts: async () => {
      return await ProductModel.find().populate('category');
    },
    getProduct: async (_: any, { id }: { id: string }) => {
      return await ProductModel.findById(id).populate('category');
    },
  },

  Mutation: {
    createProduct: async (
      _: any,
      {
        input,
      }: {
        input: {
          name: string;
          description: string;
          categoryId: string;
          price: number;
          stock: number;
          images: string[];
        };
      },
    ) => {
      const { name, description, categoryId, price, stock, images } = input;

      // Verifica se a categoria existe
      const category = await CategoryModel.findById(categoryId);
      if (!category) {
        throw new Error('Categoria não encontrada.');
      }

      const newProduct = new ProductModel({
        name,
        description,
        category: categoryId,
        price,
        stock,
        images,
      });

      return await newProduct.save();
    },

    updateProduct: async (
      _: any,
      {
        id,
        input,
      }: {
        id: string;
        input: {
          name?: string;
          description?: string;
          categoryId?: string;
          price?: number;
          stock?: number;
          images?: string[];
        };
      },
    ) => {
      const { name, description, categoryId, price, stock, images } = input;

      // Verifica se a categoria existe caso o categoryId seja passado
      if (categoryId) {
        const category = await CategoryModel.findById(categoryId);
        if (!category) {
          throw new Error('Categoria não encontrada.');
        }
      }

      const updatedProduct = await ProductModel.findByIdAndUpdate(
        id,
        {
          name,
          description,
          category: categoryId,
          price,
          stock,
          images,
        },
        { new: true }, // Retorna o documento atualizado
      ).populate('category');

      if (!updatedProduct) {
        throw new Error('Produto não encontrado.');
      }

      return updatedProduct;
    },

    deleteProduct: async (_: any, { id }: { id: string }) => {
      const deletedProduct = await ProductModel.findByIdAndDelete(id);
      return !!deletedProduct; // Retorna true se o produto foi deletado, false caso contrário
    },
  },
};

export default productResolvers;
