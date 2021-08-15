import {
  Resolver,
  Mutation,
  Arg,
  Authorized,
  registerEnumType,
} from "type-graphql";
import { prisma } from "../../prisma";
import Complaint from "../../model/Complaint";
import { ComplaintStatus } from "../../utils";

registerEnumType(ComplaintStatus, {
  name: "ComplaintStatus",
});

@Resolver()
export class ResolveComplaint {
  @Authorized(["ADMIN"])
  @Mutation(() => Complaint)
  async resolveComplaint(
    @Arg("id") id: string,
    @Arg("status", () => ComplaintStatus) status: ComplaintStatus
  ) {
    try {
      if (status == ComplaintStatus.RESOLVED) {
        return await prisma.complaint.update({
          where: { id },
          data: {
            complaintStatus: status,
            resolvedDate: new Date().toISOString(),
          },
        });
      }

      return await prisma.complaint.update({
        where: { id },
        data: {
          complaintStatus: status,
        },
      });
    } catch (e) {
      throw new Error("Something went wrong! Try Again");
    }
  }

  //   return prisma.complaint.findOne({
  //     where: { id: createdEntry.id },
}
