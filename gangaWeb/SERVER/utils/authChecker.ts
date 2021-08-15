import { AuthChecker } from "type-graphql";
import dotenv from "dotenv";
import { GraphQLContext } from ".";
dotenv.config();
export const authChecker: AuthChecker<GraphQLContext> = async (
  { context: { user } },
  roles
) => {
  if (roles.length) {
    if (roles.includes(user!.role)) return true;
    else return false;
  } else {
    if (user) return true;
    else return false;
  }
};
