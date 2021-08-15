//@ts-nocheck
import {
    Resolver,
    Mutation,
    ObjectType,
    Field,
    Arg,
    registerEnumType,
  } from "type-graphql";
  import User from "../../model/User";
  import { prisma } from "../../prisma";
  import jwt from "jsonwebtoken";
  import dotenv from "dotenv";
  import { UserRole } from "../../utils";
  dotenv.config();
  
  @ObjectType("GoogleLoginOutput")
  class GoogleLoginOutput {
    @Field() token: String;
    @Field(() => User) user: User;
  }
  
  registerEnumType(UserRole, {
    name: "UserRole",
  });
  @Resolver()
  export class GoogleSignIn {
    @Mutation(() => GoogleLoginOutput, { nullable: true })
    async googleSignIn(
      @Arg("email") email: string,
      @Arg("googleId") googleId: string,
      @Arg("name") name: string,
      @Arg("role", () => UserRole) role: UserRole
    ) {
      var user = await prisma.user.findOne({ where: { email } });
      if (!user) {
  
        user = await prisma.user.create({
          data: {
            email,
            password: "null",
            name,
            googleId,
            role,
          },
        });
      }
      return { token: jwt.sign({ id: user!.id }, process.env.JWT_SECRET!), user };
    }
  }
  