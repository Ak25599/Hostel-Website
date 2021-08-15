import { Field, ID, ObjectType, registerEnumType } from "type-graphql";
import { UserRole } from "../utils";

registerEnumType(UserRole, {
  name: "UserRole",
});

@ObjectType()
export default class User {
  @Field(() => ID) id: string;
  @Field() name: string;
  @Field() email: string;
  @Field(() => UserRole) role: UserRole;
}



