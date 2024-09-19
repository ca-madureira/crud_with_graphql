import { mergeResolvers } from '@graphql-tools/merge';
import productResolvers from './product';
import categoryResolvers from './category';

const resolvers = mergeResolvers([productResolvers, categoryResolvers]);

export default resolvers;
