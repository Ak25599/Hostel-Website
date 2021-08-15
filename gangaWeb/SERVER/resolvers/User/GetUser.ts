import { Arg, Resolver, Query } from "type-graphql";
import { prisma } from "../../prisma";
import User from "../../model/User";

@Resolver()
export class GetUser {
  @Query(() => User)
  async getUser(@Arg("email") email: string) {
    return await prisma.user.findOne({
      where: { email },
    });
  }
}
