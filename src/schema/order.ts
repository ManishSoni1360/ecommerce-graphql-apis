import { gql } from "apollo-server";

export const orderTypeDefs = gql`
  enum OrderStatus {
    PENDING
    PROCESSING
    SHIPPED
    DELIVERED
    CANCELLED
  }

  type OrderItem {
    id: ID!
    product: Product!
    quantity: Int!
    unitPrice: Float!
  }

  type Order {
    id: ID!
    user: User!
    status: OrderStatus!
    totalAmount: Float!
    createdAt: String!
    updatedAt: String!
    items: [OrderItem!]!
  }

  extend type Query {
    orders: [Order!]!
    order(id: ID!): Order
  }

  input OrderItemInput {
    productId: ID!
    quantity: Int!
  }

  extend type Mutation {
    createOrder(items: [OrderItemInput!]!): Order!
    updateOrderStatus(id: ID!, status: OrderStatus!): Order!
  }
`;
