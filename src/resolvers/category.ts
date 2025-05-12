import { PrismaClient } from "@prisma/client";
import { ApolloErrorWithStatusCode } from "../utils/error";

const prisma = new PrismaClient();

export const categoryResolvers = {
  Query: {
    // Get all the categories in the db
    categories: () => prisma.category.findMany(),

    // Get category with specific id
    category: (_: any, args: { id: string }) =>
      prisma.category.findUnique({ where: { id: args.id } }),
  },

  Mutation: {
    // Create new category - only ADMIN can perform this operation
    createCategory: (_: any, args: any, context: any) => {
      if (context.user.role !== "ADMIN")
        throw new ApolloErrorWithStatusCode("Unauthorized", 401);
      return prisma.category.create({ data: args });
    },

    // Updating the existing category - only ADMIN can perform this operation
    updateCategory: (_: any, args: any, context: any) => {
      if (context.user.role !== "ADMIN")
        throw new ApolloErrorWithStatusCode("Unauthorized", 401);
      const { id, ...data } = args;
      return prisma.category.update({ where: { id }, data });
    },
  },
};
