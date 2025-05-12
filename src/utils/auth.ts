import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || "jwt_secret";

//Fnction to generate jwt token with 7 days expiration
export const generateToken = (user: {
  id: string;
  role: "ADMIN" | "CUSTOMER";
}) => {
  return jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, {
    expiresIn: "7d",
  });
};

// Function to verify token and return user with id decoded from token
export const getUserFromToken = async (token: string) => {
  try {
    const decodedToken = jwt.verify(token, JWT_SECRET) as { userId: string };
    return await prisma.user.findUnique({ where: { id: decodedToken.userId } });
  } catch (error) {
    console.log("Error while getting and verfying token: ", error);
    return null;
  }
};
