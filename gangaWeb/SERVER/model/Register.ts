import { ObjectType, Field, ID } from "type-graphql";
import Book from "./Book";

@ObjectType()
export default class Register {
  @Field(() => ID) id: string;
  @Field() studentName: string;
  @Field() rollNumber: string;
  @Field(()=>Book) book: Book;
  @Field({defaultValue:false}) returnStatus: boolean;
  @Field({ nullable:true}) issuedDate: string;
  @Field({ nullable:true }) returnedDate: string;

}

