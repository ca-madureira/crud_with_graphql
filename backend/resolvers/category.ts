import CategoryModel from '../models/category.model';

const categoryResolvers = {
  Query: {
    getCategories: async () => {
      return await CategoryModel.find({});
    },
    getCategory: async (_: any, args: { id: string }) => {
      const { id } = args;
      return await CategoryModel.findById(id);
    },
  },
  Mutation: {
    createCategory: async (_: any, args: { input: { name: string } }) => {
      const { name } = args.input;
      const newCategory = new CategoryModel({ name });
      return await newCategory.save();
    },

    updateCategory: async (
      _: any,
      args: { id: string; input: { name?: string } },
    ) => {
      const { id, input } = args;
      const { name } = input;

      return await CategoryModel.findByIdAndUpdate(id, { name }, { new: true });
    },
    deleteCategory: async (_: any, args: { id: string }) => {
      const { id } = args;
      const deleted = await CategoryModel.findByIdAndDelete(id);
      return !!deleted;
    },
  },
};

export default categoryResolvers;
