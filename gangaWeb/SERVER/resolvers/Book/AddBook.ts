import {
  Resolver,
  Mutation,
  InputType,
  Field,
  Arg,
  Authorized,
} from "type-graphql";
import { prisma } from "../../prisma";
import Book from "../../model/Book";

@InputType("AddBookInput")
class AddBookInput {
  @Field() bookId: string;
  @Field() genre: string;
  @Field() isbn: string;
  @Field() language: string;
  @Field() name: string;
  @Field() publisher: string;
  @Field() year: string;
  @Field() authorId: string;
}

@Resolver()
export class AddBook {
  @Authorized(["LITSEC"])
  @Mutation(() => Book)
  async addBook(
    @Arg("data")
    {
      name,
      bookId,
      genre,
      isbn,
      language,
      publisher,
      year,
      authorId,
    }: AddBookInput
  ) {
    const existing = await prisma.book.findMany({
      where: {
        bookid: bookId,
      },
    });

    const exists = existing.find((book) => book.bookid === bookId);

    if (exists) {
      throw new Error("A book with the same info already exists");
    }
    const book = await prisma.book.create({
      data: {
        name,
        bookid: bookId,
        genre,
        isbn,
        language,
        publisher,
        year,
        authoredBy: {
          connect: {
            id: authorId,
          },
        },
      },
    });

    return book;
  }
}
