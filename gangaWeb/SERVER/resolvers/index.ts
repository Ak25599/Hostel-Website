import UserResolver from "./User";
import BookResolvers from "./Book";
import RegisterResolver from "./Register";
import AuthorResolver from "./Author";
import ComplaintResolver from "./Complaint";
export const resolvers = [
  ...UserResolver,
  ...ComplaintResolver,
  ...BookResolvers,
  ...RegisterResolver,
  ...AuthorResolver,
];
