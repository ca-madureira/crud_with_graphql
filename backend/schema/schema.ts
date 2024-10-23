import { gql } from 'apollo-server-express';

const typeDefs = gql`
  type Category {
    id: ID!
    name: String!
  }

  type Product {
    id: ID!
    name: String!
    description: String!
    category: Category!
    price: Float!
    stock: Int!
    images: [String!]!
  }

  type Ticket {
    id: ID!
    content: String!
  }

  type Query {
    getCategories: [Category!]!
    getCategory(id: ID!): Category

    getTickets: [Ticket!]!

    getProducts: [Product!]!
    getProduct(id: ID!): Product
  }

  input CreateCategoryInput {
    name: String!
  }

  input UpdateCategoryInput {
    name: String
  }

  input CreateProductInput {
    name: String!
    description: String!
    categoryId: ID!
    price: Float!
    stock: Int!
    images: [String!]!
  }

  input UpdateProductInput {
    name: String
    description: String
    categoryId: ID
    price: Float
    stock: Int
    images: [String!]
  }

  type Mutation {
    createCategory(input: CreateCategoryInput!): Category!
    updateCategory(id: ID!, input: UpdateCategoryInput!): Category!
    deleteCategory(id: ID!): Boolean

    createTicket(content: String!, status: ID!): Ticket!
    deleteTicket(id: ID!): Boolean

    createProduct(input: CreateProductInput!): Product!
    updateProduct(id: ID!, input: UpdateProductInput!): Product!
    deleteProduct(id: ID!): Boolean
  }
`;

export default typeDefs;
