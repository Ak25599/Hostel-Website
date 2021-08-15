import Author from "../../model/Author";
import { Resolver, Query } from "type-graphql";
import { prisma } from "../../prisma";

@Resolver()
export class GetAuthors {
  @Query(() => [Author])
  async getAuthors() {
    const authors= await prisma.author.findMany({
      include: {
        book: true
      }
    });
    
    return authors;
      
    }
  }


