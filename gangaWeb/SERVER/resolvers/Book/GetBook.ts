
import { Arg, Query, Resolver } from "type-graphql";
import Book from "../../model/Book";
import { prisma } from "../../prisma";

@Resolver()
export class GetBook {
  
  @Query(() => Book)
  async getBook(@Arg("id") id:string) {
    try
    {
      
      const book = await prisma.book.findOne({
        where: {
          id,
        },
        include: {
          authoredBy: {
            include: {
              book:true
            },
          },

        }
      });
      console.log("entered");
      return book;
    }
    catch (e) {
      console.log(e, "caught the error");
      throw new Error(
        "Couldn't fetch the details of the book"
      );
    }
    return 0;
  }
}
