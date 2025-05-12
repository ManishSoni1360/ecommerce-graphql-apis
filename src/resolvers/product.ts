import { PrismaClient } from "@prisma/client";
import { ApolloErrorWithStatusCode } from "../utils/error";

const prisma = new PrismaClient();

export const productResolvers = {
  Query: {
    // Quering the products with filters like min and max price
    products: (_: any, args: any) => {
      const { categoryId, minPrice, maxPrice } = args;
      return prisma.product.findMany({
        where: {
          ...(categoryId && { categoryId }),
          ...(minPrice &&
            maxPrice && {
              price: { gte: minPrice, lte: maxPrice },
            }),
        },
      });
    },

    // Getting product with specific id
    product: (_: any, { id }: { id: string }) =>
      prisma.product.findUnique({ where: { id } }),
  },

  Mutation: {
    // Creating new product - only ADMIN is authorized to perform
    createProduct: (_: any, args: any, context: any) => {
      if (context.user.role !== "ADMIN")
        throw new ApolloErrorWithStatusCode("Unauthorized", 401);
      return prisma.product.create({ data: args });
    },

    // Updating new product - only ADMIN is authorized to perform
    updateProduct: (_: any, args: any, context: any) => {
      if (context.user.role !== "ADMIN")
        throw new ApolloErrorWithStatusCode("Unauthorized", 401);
      const { id, ...data } = args;
      return prisma.product.update({ where: { id }, data });
    },

    // Deleting new product - only ADMIN is authorized to perform
    deleteProduct: (_: any, { id }: { id: string }, context: any) => {
      if (context.user.role !== "ADMIN")
        throw new ApolloErrorWithStatusCode("Unauthorized", 401);
      return prisma.product.delete({ where: { id } });
    },
  },
};
