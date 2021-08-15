import Book from "../../model/Book";
import { Resolver, Query, Arg, registerEnumType } from "type-graphql";
import { prisma } from "../../prisma";
import { BookStatus } from "../../utils";

registerEnumType(BookStatus, {
  name: "BookStatus",
});

@Resolver()
export class GetBooks {
  @Query(() => [Book])
  async getBooks(@Arg("type") type:string) {
    switch (type){
      case "ALL":
      return await prisma.book.findMany({
          });
      case "AVAILABLE":
      return await prisma.book.findMany({
        where: {
          status: BookStatus.AVAILABLE,
        }
          });
      case "ISSUED":
        return await prisma.book.findMany({
          where: {
            status: BookStatus.ISSUED,
          }
            });
      default:
        return await prisma.book.findMany({
        });
    }  
    }
  }


