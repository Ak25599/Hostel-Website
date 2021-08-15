import {
  Authorized,
  Arg,
  Resolver,
  Query,
  registerEnumType
} from "type-graphql";
import Complaint from "../../model/Complaint";
import { UserRole } from "../../utils";
import { prisma } from "../../prisma";



registerEnumType(UserRole, {
    name: "UserRole",
  });



@Resolver()
export class GetComplaint {
  @Authorized("ADMIN")
  @Query(() => Complaint)
  async getComplaint(
    @Arg("id")  id: string,
  ) {
        return await prisma.complaint.findOne({
          where: {
            id,
          },
        });
  }
}
