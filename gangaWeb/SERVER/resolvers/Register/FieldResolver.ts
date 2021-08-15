import { Resolver, FieldResolver, Root } from "type-graphql";
import { prisma } from "../../prisma";
import Register from "../../model/Register";
import Book from "../../model/Book";

@Resolver(Register)
export class RegisterFieldResolver {
  @FieldResolver(() => Book)
  async book(@Root() { id }: Register) {
    return await prisma.register
      .findOne({
        where: {
          id,
        },
      })
      .book();
  }

}
