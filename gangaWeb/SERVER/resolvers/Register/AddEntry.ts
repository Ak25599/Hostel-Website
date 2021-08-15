import {
  Resolver,
  Mutation,
  InputType,
  Field,
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

@InputType("AddEntryInput")
class AddEntryInput {
  @Field() studentName: string;
  @Field() rollNumber: string;
  @Field() bookId: string;
}

@Resolver()
export class AddEntry {
  @Authorized(["LITSEC"])
  @Mutation(() => Register)
  async addEntry(
    @Arg("data") { studentName, bookId, rollNumber }: AddEntryInput
  ) {
    try {
      const createdEntry = await prisma.register.create({
        data: {
          studentName,
          rollNumber,
          issuedDate: new Date().toISOString(),
          book: {
            connect: {
              bookid: bookId,
            },
          },
        },
      });
      if (!!createdEntry) {
        try {
          await prisma.book.update({
            where: { bookid: bookId },
            data: { status: BookStatus.ISSUED },
          });
        } catch (e) {
          throw new Error("Something went wrong! Try Again");
        }
      }
      return await prisma.register.findOne({
        where: { id: createdEntry.id },
      });
    } catch (error) {
      throw new Error("Something went wrong! Try Again");
    }
  }
}
