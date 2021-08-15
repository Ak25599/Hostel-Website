import {
  Resolver,
  Mutation,
  InputType,
  Field,
  Arg,
  Authorized,
  Ctx,
} from "type-graphql";
import Complaint from "../../model/Complaint";
import { prisma } from "../../prisma";
import { GraphQLContext, ComplaintStatus } from "../../utils";

@InputType("CreateComplaintInput")
class CreateComplaintInput {
  @Field() complaint: string;
  @Field() floor: string;
  @Field({ nullable: true }) roomNumber?: string;
  @Field({ nullable: true }) description?: string;
}

@Resolver()
export class CreateComplaint {
  @Authorized("STUDENT")
  @Mutation(() => Complaint)
  async createComplaint(
    @Arg("data")
    { complaint, floor, roomNumber, description }: CreateComplaintInput,
    @Ctx() { user }: GraphQLContext
  ) {
    console.log("Entered");
    try {
      console.log(user!.email);
      console.log(complaint);
      console.log(floor);
      return await prisma.complaint.create({
        data: {
          smail: user!.email,
          complaint,
          floor,
          roomNumber,
          description,
          complaintStatus: ComplaintStatus.PENDING,
        },
      });
    } catch (error) {
      console.log(error);
      throw new Error("Something went wrong");
    }
  }
}
