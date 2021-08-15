import { Resolver, Query, Ctx } from "type-graphql";
import User from "../../model/User";
import { GraphQLContext } from "../../utils";

@Resolver()
export class MeResolver {
  @Query(() => User, { nullable: true })
  async me(@Ctx() { user }: GraphQLContext) {
    return user;
  }
}
