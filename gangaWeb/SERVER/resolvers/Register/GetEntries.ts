import { Resolver, Query, Authorized} from "type-graphql";
import Register from "../../model/Register";
import { prisma } from "../../prisma";

import {
  Arg,
  Int,
  registerEnumType
} from "type-graphql";
import { BookStatus } from "../../utils";

registerEnumType(BookStatus, {
  name: "BookStatus",
});


@Resolver()
export class GetEntries {
  @Authorized("LITSEC")
  @Query(() => [Register])
  async getEntries(
    @Arg("offset", () => Int) offset: number,
  ) {
    console.log("Got the Entry")
    try{    return await prisma.register.findMany({
      skip: offset || 0,
      take: 10,
      orderBy: {
        issuedDate: "desc",
      },
    });

    } catch (error) {
      throw new Error("Something went wrong!");
        }
  }
}





