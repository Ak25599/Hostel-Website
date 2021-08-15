import {
  Resolver,
  Mutation,
  Arg,
  InputType,
  Field,
} from "type-graphql";
import Complaint from "../../model/Complaint";
import { prisma } from "../../prisma";

@InputType("SetComplaintUrlInput")
class SetComplaintUrlInput {
  @Field() id: string;
  @Field() url: string;
}

@Resolver()
export class SetComplaintDownloadUrl {
  @Mutation(() => Complaint)
  async setComplaintDownloadUrl(
    @Arg("data") { id, url }: SetComplaintUrlInput
  ) {
    return await prisma.complaint.update({
      where: {
        id,
      },
      data: {
        url,
      },
    });
  }
}
