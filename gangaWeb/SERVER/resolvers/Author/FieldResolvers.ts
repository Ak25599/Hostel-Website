import { Resolver, FieldResolver, Root } from "type-graphql";
import Book from "../../model/Book";
import Author from "../../model/Author";

import { prisma } from "../../prisma";

@Resolver(Author)
export class AuthorFieldResolvers {
  @FieldResolver(() => [Book])
  async book(@Root() { id }: Author) {
    return await prisma.author
      .findOne({
        where: { id },
      })
      .book();
  }
 
}
