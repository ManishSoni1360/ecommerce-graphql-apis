import { gql } from "apollo-server";

export const categoryTypeDefs = gql`
  type Category {
    id: ID!
    name: String!
    description: String!
    createdAt: String!
    updatedAt: String!
    products: [Product!]!
  }

  extend type Query {
    categories: [Category!]!
    category(id: ID!): Category!
  }

  extend type Mutation {
    createCategory(name: String!, description: String!): Category!
    updateCategory(id: ID!, name: String, description: String): Category!
  }
`;
