import { Resolver, Query } from "type-graphql";
import User from "../../model/User";
import { prisma } from "../../prisma";

@Resolver()
export class GetUsers {
  @Query(() => [User])
  async getUsers() {
    return await prisma.user.findMany();
  }
}
