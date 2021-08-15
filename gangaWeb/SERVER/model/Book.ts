import { ObjectType, ID, Field, registerEnumType } from "type-graphql";
import Author from "./Author";
import Register from "./Register";
import { BookStatus } from "../utils";

registerEnumType(BookStatus, {
  name: "BookStatus",
});

@ObjectType()
export default class Book {
  @Field(() => ID) id: string;
  @Field() bookid: string;
  @Field() genre: string;
  @Field() isbn: string;
  @Field() language: string;
  @Field() name: string;
  @Field() publisher: string;
  @Field() year: string;
  @Field({defaultValue:BookStatus.AVAILABLE}) status: BookStatus;
  @Field(() => Author) authoredBy: Author;
  @Field(() => [Register]) register: Register[];
 }

 