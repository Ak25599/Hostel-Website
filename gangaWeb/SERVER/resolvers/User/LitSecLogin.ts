import { Resolver, ObjectType, Field, Mutation, Arg } from "type-graphql";
import User from "../../model/User";
import { prisma } from "../../prisma";
import { UserRole } from "../../utils";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

@ObjectType("LitSecLoginOutput")
class LitSecLoginOutput {
  @Field() token: String;
  @Field(() => User) user: User;
}

@Resolver()
export class LitSecLoginResolver {
  @Mutation(() => LitSecLoginOutput, { nullable: true })
  async litSecLogin(
    @Arg("email") email: string,
    @Arg("password") password: string
  ) {
    const user = await prisma.user.findOne({ where: { email } as any });
    if (!user) throw new Error("User Does not exist!");
    if (user.role != UserRole.LITSEC) throw new Error("Not Authorised!");
    const valid = await bcrypt.compareSync(password, user.password);
    if (!valid) throw new Error("Incorrect credentials");
    return { token: jwt.sign({ id: user!.id }, process.env.JWT_SECRET!), user };
  }
}
