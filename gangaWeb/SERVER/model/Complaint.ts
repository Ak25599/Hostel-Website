import { ObjectType, Field, ID, registerEnumType } from "type-graphql";
import { ComplaintStatus } from "../utils";

registerEnumType(ComplaintStatus, {
    name: "ComplaintStatus",
  });
  
@ObjectType()
export default class Complaint {

  @Field(() => ID) id: string;
  @Field() smail: string;
  @Field() complaint: string;
  @Field() floor: string;
  @Field(() => ComplaintStatus, { defaultValue: ComplaintStatus.PENDING }) complaintStatus: ComplaintStatus;
  @Field({ nullable: true }) roomNumber?: string;
  @Field({ nullable: true }) description?: string;
  @Field({ nullable: true }) url?: string;
  @Field({ nullable: true }) complaintDate?: Date;
  @Field({ nullable: true }) resolvedDate?: Date;      
}



