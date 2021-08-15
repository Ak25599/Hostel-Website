import {
  Resolver,
  Mutation,
  Arg,
  ObjectType,
  Field,
  Ctx,
} from "type-graphql";
import { GraphQLContext } from "../../utils";

@ObjectType()
class GetComplaintUploadUrlOutput {
  @Field() uploadUrl: string;
  @Field() downloadUrl: string;
}

@Resolver()
export default class GetComplaintUploadUrl {
  
  @Mutation(() => GetComplaintUploadUrlOutput)
  async getComplaintUploadUrl(
    @Arg("fileName") fileName: string,
    @Arg("complaintId") complaintId: string,
    @Ctx() {  s3 }: GraphQLContext
  ) {
    const path = `/${complaintId}/${fileName}`;
    const uploadParams = {
      Bucket: "classroom-submissions",
      Key: path,
      Expires: 60 * 5,
      ACL: "public-read",
      ContentType: fileName.split(".").pop(),
    };
    try {
      const uploadUrl: string | null = await new Promise((resolve) => {
        s3.getSignedUrl("putObject", uploadParams, (err: any, url: any) => {
          resolve(url);
          if (err) throw new Error();
        });
      });

      const url = `https://classroom-submissions.s3.amazonaws.com/${path}`;
      if (!uploadUrl) throw new Error();
      return {
        uploadUrl,
        downloadUrl: url,
      };
    } catch (error) {
      throw new Error("Something went wrong please try again!");
    }
  }
}
