import { GetUsers } from "./GetUsers";
import { CreateUser } from "./CreateUser";
import { MeResolver } from "./Me";
import { LoginResolver } from "./Login";
import { UserFieldResolver } from "./FieldResolvers";
import { GoogleSignIn } from "./GoogleSignIn";
import { GetUser } from "./GetUser";
import { LitSecLoginResolver } from "./LitSecLogin";

export default [
  GetUsers,
  GetUser,
  GoogleSignIn,
  CreateUser,
  MeResolver,
  LoginResolver,
  UserFieldResolver,
  LitSecLoginResolver,
];
