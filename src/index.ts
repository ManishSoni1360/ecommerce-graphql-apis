import { ApolloServer } from "apollo-server";
import dotenv from "dotenv";
import { typeDefs } from "./schema";
import { resolvers } from "./resolvers";
import { PrismaClient } from "@prisma/client";
import { getUserFromToken } from "./utils/auth";

dotenv.config();

const prisma = new PrismaClient();

const server = new ApolloServer({
  typeDefs,
  resolvers,

  // Passing context for authorization
  context: async ({ req }) => {
    const authHeader = req.headers.authorization || "";

    // Removing Bearer from auth header to get the jwt token
    const token = authHeader.replace("Bearer ", "").trim();
    const user = await getUserFromToken(token);
    return { prisma, user };
  },
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
