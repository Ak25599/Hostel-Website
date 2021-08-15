import {
  Resolver,
  Authorized,
  Mutation,
  Arg,
} from "type-graphql";
import Author from "../../model/Author";
import { prisma } from "../../prisma";


@Resolver()
export class CreateAuthor {
  @Authorized("LITSEC")
  @Mutation(() => Author)
  async createAuthor(
    @Arg("name")
     name: string,
  ) {
    const existing = await prisma.author.findMany({
      where: {
        name,
      },
    });

    const exists = await existing.find((aut) => aut.name === name);

    if (exists) {
      
        throw new Error(
          "An author with this name, already exists, please add a numeral or something else to differntiate."
        );
      
      return exists;
    }

    try {
      return await prisma.author.create({
        data: {
          name,
//          submittedOn: Date.now().toString(),
        },
      });
    } catch (error) {
      throw new Error("Something went wrong");
    }
  }
}
