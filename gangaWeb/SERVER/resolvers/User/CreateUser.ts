import { Arg, Resolver, Mutation, registerEnumType } from "type-graphql";
import { prisma } from "../../prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { UserRole } from "../../utils";

registerEnumType(UserRole, {
  name: "UserRole",
});
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNrZHNkcnRjcjAxODlkc3V4aDB6eHU1ejAiLCJpYXQiOjE1OTcyOTc2Mzh9.hcQc5noUG9B-7nhpAi_OKeZPhBIezKbLWxFrG5TTwP4
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNrZHNkdGJndDAwMDA2NHV4aTNxYjlvcnUiLCJpYXQiOjE1OTcyOTc3MDh9.jx3OCCZk98-0OAaETnR-ojQ5i6vYhGmKe9ooGREePeQ
@Resolver()
export class CreateUser {
  @Mutation(() => String)
  async createUser(
    @Arg("name") name: string,
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Arg("role", () => UserRole) role: UserRole,
  ) {
    const hash = await bcrypt.hashSync(password, 12);
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hash,
        role,
      },
    });

    if (!user) throw new Error("User Exists");
    return jwt.sign({ id: user!.id }, process.env.JWT_SECRET!);
  }
}
