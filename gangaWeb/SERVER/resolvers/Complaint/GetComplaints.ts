import {
  Authorized,
  Arg,
  Resolver,
  Query,
  Int,
  registerEnumType
} from "type-graphql";
import Complaint from "../../model/Complaint";
import { ComplaintStatus } from "../../utils";
import { prisma } from "../../prisma";


registerEnumType(ComplaintStatus, {
    name: "ComplaintStatus",
  });



@Resolver()
export class GetComplaints {
  @Authorized("ADMIN")
  @Query(() => [Complaint])
  async getComplaints(
    @Arg("type", () => ComplaintStatus) type: ComplaintStatus,
    @Arg("offset", () => Int) offset: number,
  ) {
    switch (type) {
          case ComplaintStatus.PENDING:
        return await prisma.complaint.findMany({
          where: {
            complaintStatus:ComplaintStatus.PENDING
          },
          skip: offset || 0,
          take: 10,
          orderBy: {
            complaintDate: "desc",
          },
        });
        case ComplaintStatus.INPROGRESS:
          return await prisma.complaint.findMany({
            where: {
              complaintStatus:ComplaintStatus.INPROGRESS
            },
            skip: offset || 0,
            take: 10,
            orderBy: {
              complaintDate: "desc",
            },
          });
          case ComplaintStatus.RESOLVED:
            return await prisma.complaint.findMany({
              where: {
                complaintStatus:ComplaintStatus.RESOLVED
              },
              skip: offset || 0,
              take: 10,
              orderBy: {
                complaintDate: "desc",
              },
            });}
    
    

  }
}
