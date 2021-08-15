import { Resolver } from "type-graphql";
//, FieldResolver, Root
import User from "../../model/User";
//import { prisma } from "../../prisma";

@Resolver(User)
export class UserFieldResolver {

  // @FieldResolver(() => [Submission])
  // async assignmentsSubmitted(@Root() { id }: User) {
  //   return await prisma.user
  //     .findOne({
  //       where: {
  //         id,
  //       },
  //     })
  //     .assignmentsSubmitted();
  // }

  // @FieldResolver(() => [Assignment])
  // async submissionsGraded(@Root() { id }: User) {
  //   return await prisma.user
  //     .findOne({
  //       where: {
  //         id,
  //       },
  //     })
  //     .submissionsGraded();
  // }
}
