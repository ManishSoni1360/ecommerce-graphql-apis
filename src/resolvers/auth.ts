import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { ApolloErrorWithStatusCode } from "../utils/error";
import { validateEmail, validatePassword } from "../utils/validation";
import { generateToken } from "../utils/auth";

const prisma = new PrismaClient();

export const authResolvers = {
  Mutation: {
    register: async (_: any, args: any) => {
      const { email, password, firstName, lastName } = args;

      if (!validateEmail(email)) {
        throw new ApolloErrorWithStatusCode("Invalid email format.", 400);
      }
      if (!validatePassword(password)) {
        throw new ApolloErrorWithStatusCode(
          "Password must be at least 8 characters.",
          400
        );
      }

      // Finding whether the user already exists
      const existingUser = await prisma.user.findUnique({
        where: { email: email },
      });

      if (existingUser) {
        throw new ApolloErrorWithStatusCode("User already exists", 409);
      }

      // Encrypting the password before inserting into the db
      const hashedPassword = await bcrypt.hash(password, 10);

      // If role is not passed in the payload then, by default the role will be set to CUSTOMER
      const role = args.role || "CUSTOMER";

      // Inserting the user data
      const user = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          firstName,
          lastName,
          role,
        },
      });

      // Token generation
      const token = generateToken(user);
      return { token, user };
    },

    login: async (
      _: any,
      { email, password }: { email: string; password: string }
    ) => {
      // Finding whether the user exists or not
      const user = await prisma.user.findUnique({ where: { email } });

      if (!user) {
        throw new ApolloErrorWithStatusCode("User not found", 404);
      }

      // Payload password and user password get from db comparison
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        throw new ApolloErrorWithStatusCode("Invalid credentials", 401);
      }

      // Token generations
      const token = generateToken(user);
      return { token, user };
    },
  },
  Query: {
    me: async (_: any, __: any, context: any) => {
      return prisma.user.findUnique({ where: { id: context.userId } });
    },
  },
};
