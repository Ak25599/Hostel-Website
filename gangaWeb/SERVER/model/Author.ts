import { ObjectType, Field, ID} from "type-graphql";
import Book from "./Book";

@ObjectType()
export default class Author {
  @Field(() => ID) id: string;
  @Field() name: string;
  @Field(() => [Book]) book: Book[];
}
