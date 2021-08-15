import { ApolloServer } from "apollo-server";
import dotenv from "dotenv";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { resolvers } from "./resolvers";
import { getAuthUser } from "./utils/getAuthUser";
import { authChecker } from "./utils/authChecker";
import AWS from "aws-sdk";
dotenv.config();

const s3 = new AWS.S3({
  apiVersion: "2006-03-01",
  accessKeyId: "AKIARHXIIHUCN4NZ4ZGA",
  secretAccessKey: "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",
  signatureVersion: "v4",
  region: "ap-south-1",
});

const startServer = async () => {
  const schema = await buildSchema({
    resolvers,
    authChecker,
    validate: false,
  } as any);
  const server = new ApolloServer({
    schema,
    context: async ({ req, connection }) => {
      const user = await getAuthUser({ req, connection });
      return { user, s3 };
    },
    cors: {
      origin: ["http://gangawebapp.s3-website.ap-south-1.amazonaws.com"],
      credentials: true,
    },
    subscriptions: {
      path: "/",
    },
  });
  server.listen(9000).then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });
};

startServer();
