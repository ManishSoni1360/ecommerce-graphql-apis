import { gql } from "apollo-server";
import { authTypeDefs } from "./auth";
import { categoryTypeDefs } from "./category";
import { productTypedefs } from "./product";
import { orderTypeDefs } from "./order";

const baseTypeDefs = gql`
  type Query
  type Mutation
`;

export const typeDefs = [
  baseTypeDefs,
  authTypeDefs,
  categoryTypeDefs,
  productTypedefs,
  orderTypeDefs,
];
