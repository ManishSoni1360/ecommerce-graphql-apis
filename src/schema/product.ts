import { gql } from "apollo-server";

export const productTypedefs = gql`
  type Product {
    id: ID!
    name: String!
    description: String!
    price: Float!
    inventory: Int!
    createdAt: String!
    updatedAt: String!
    category: Category!
  }

  extend type Query {
    products(categoryId: ID, minPrice: Float, maxPrice: Float): [Product!]!
    product(id: ID!): Product
  }

  extend type Mutation {
    createProduct(
      name: String!
      description: String!
      price: Float!
      inventory: Int!
      categoryId: ID!
    ): Product!
    updateProduct(
      id: ID!
      name: String
      description: String
      price: Float
      inventory: Int
    ): Product!
    deleteProduct(id: ID!): Boolean!
  }
`;
