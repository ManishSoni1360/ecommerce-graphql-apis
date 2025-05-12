// import { PrismaClient } from "@prisma/client";
// import jwt from "jsonwebtoken";
// import { Request } from "express";
// import dotenv from "dotenv";

// dotenv.config();

// const prisma = new PrismaClient();

// export type AuthUser = {
//   id: string;
//   email: string;
//   role: "ADMIN" | "CUSTOMER";
// };

// export type GraphQLContext = {
//   prisma: PrismaClient;
//   user: AuthUser | null;
// };

// export type Context = {
//   prisma: PrismaClient;
//   user: AuthUser | null;
// };

// export const createContext = async ({ req }: { req: Request }) => {
//   const token = req.headers.authorization?.split(" ")[1];
//   let user: AuthUser | null = null;

//   if (token) {
//     try {
//       const decoded = jwt.verify(token, process.env.JWT_SECRET!) as AuthUser;
//       user = decoded;
//     } catch (err) {
//       console.warn("Invalid token:", err);
//     }
//   }

//   return {
//     prisma,
//     user,
//   };
// };
