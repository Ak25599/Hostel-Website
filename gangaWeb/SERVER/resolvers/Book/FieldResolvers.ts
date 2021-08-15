import { Resolver, FieldResolver, Root } from "type-graphql";
import Book from "../../model/Book";
import Register from "../../model/Register";
import { prisma } from "../../prisma";
import Author from "../Author";

@Resolver(Book)
export class BookFieldResolvers {
  
  
  @FieldResolver(() => [Register])
  async register(@Root() { id }: Book) {
    return await prisma.book
      .findOne({
        where: { id },
      })
      .register();
  }

  @FieldResolver(() => Author)
  async authoredBy(@Root() { id }: Book) {
    return await prisma.book
      .findOne({
        where: { id }
      })
      .authoredBy();
  }
}
