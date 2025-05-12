import { gql } from "apollo-server";

export const authTypeDefs = gql`
  enum Role {
    ADMIN
    CUSTOMER
  }

  type User {
    id: ID!
    email: String!
    firstName: String!
    lastName: String!
    role: Role!
    createdAt: String!
    updatedAt: String!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  extend type Query {
    me: User
    users: [User!]!
  }

  extend type Mutation {
    register(
      email: String!
      password: String!
      firstName: String!
      lastName: String!
      role: Role
    ): AuthPayload!
    login(email: String!, password: String!): AuthPayload!
  }
`;
