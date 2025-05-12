import { authResolvers } from "./auth";
import { categoryResolvers } from "./category";
import { productResolvers } from "./product";
import { orderResolvers } from "./order";
import { mergeResolvers } from "@graphql-tools/merge";

// Merging all the resolvers
export const resolvers = mergeResolvers([
  authResolvers,
  categoryResolvers,
  productResolvers,
  orderResolvers,
]);
