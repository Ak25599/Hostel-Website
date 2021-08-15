import {
  Resolver,
  Mutation,
  Arg,
  Authorized,
  registerEnumType,
} from "type-graphql";
import { prisma } from "../../prisma";
import Register from "../../model/Register";
import { BookStatus } from "../../utils";

registerEnumType(BookStatus, {
  name: "BookStatus",
});

@Resolver()
export class AddExit {
  @Authorized(["LITSEC"])
  @Mutation(() => Register)
  async addExit(@Arg("id") id: string) {
    try {
      const updatedEntry = await prisma.register.update({
        where: {
          id,
        },
        data: {
          returnedDate: new Date().toISOString(),
          returnStatus: true,
        },
      });
      if (!!updatedEntry) {
        try {
          await prisma.book.update({
            where: { bookid: updatedEntry.bookId },
            data: { status: BookStatus.AVAILABLE },
          });
        } catch (e) {
          throw new Error("Something went wrong! Try Again");
        }
      }
      return await prisma.register.findOne({
        where: { id: updatedEntry.id },
      });
    } catch (error) {
      throw new Error("Something went wrong! Try Again");
    }
  }
}
