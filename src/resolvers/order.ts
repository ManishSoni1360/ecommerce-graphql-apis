import { PrismaClient } from "@prisma/client";
import { ApolloErrorWithStatusCode } from "../utils/error";

const prisma = new PrismaClient();

export const orderResolvers = {
  Query: {
    // Getting all the orders from db
    orders: async (_: any, args: any, context: any) => {
      if (context.user.role === "ADMIN") return prisma.order.findMany();
      const { take, skip } = args;
      return prisma.order.findMany({
        take,
        skip,
        where: { userId: context.userId },
      });
    },
  },

  Mutation: {
    // Creating new order with initial status as PENDING and totalAmount as 0
    createOrder: async (_: any, { items }: any, context: any) => {
      const order = await prisma.order.create({
        data: {
          userId: context.userId,
          totalAmount: 0,
          status: "PENDING",
          items: {
            // Finding the product details with id for each item in the order in parallel
            create: await Promise.all(
              items.map(async (item: any) => {
                const product = await prisma.product.findUnique({
                  where: { id: item.productId },
                });
                if (!product)
                  throw new ApolloErrorWithStatusCode("Product not found", 404);
                return {
                  productId: item.productId,
                  quantity: item.quantity,
                  unitPrice: product.price,
                };
              })
            ),
          },
        },
        include: { items: true },
      });

      // Calculating the total amount of all the items in the order
      const total = order.items.reduce(
        (sum: number, i: { quantity: number; unitPrice: number }) =>
          sum + i.quantity * i.unitPrice,
        0
      );

      await prisma.order.update({
        where: { id: order.id },
        data: { totalAmount: total },
      });

      return { ...order, totalAmount: total };
    },

    // Updating the order status - Only ADMIN is authorized to perform this operation
    updateOrderStatus: async (_: any, { id, status }: any, context: any) => {
      if (context.user.role !== "ADMIN")
        throw new ApolloErrorWithStatusCode("Unauthorized", 401);
      return prisma.order.update({ where: { id }, data: { status } });
    },
  },
};
