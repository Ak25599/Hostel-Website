import { Resolver, Mutation, Arg, Field, ObjectType } from "type-graphql";
import { prisma } from "../../prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../../model/User";

dotenv.config();

@ObjectType("LoginOutput")
class LoginOutput {
  @Field() token: String;
  @Field(() => User) user: User;
}

@Resolver()
export class LoginResolver {
  @Mutation(() => LoginOutput, { nullable: true })
  async login(@Arg("email") email: string, @Arg("password") password: string) {
    const user = await prisma.user.findOne({ where: { email } as any });
    if (!user) throw new Error("User Does not exist!");
    const valid = await bcrypt.compareSync(password, user.password);
    if (!valid) throw new Error("Incorrect credentials");
    return { token: jwt.sign({ id: user!.id }, process.env.JWT_SECRET!), user };
  }
}
