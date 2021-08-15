import { User } from "@prisma/client";
export interface GraphQLContext {
  user: User | null;
  s3: any;
}


export enum ComplaintStatus {
  PENDING="PENDING",
  INPROGRESS = "INPROGRESS",
  RESOLVED = "RESOLVED"
}

export enum UserRole {
  LITSEC="LITSEC",
  ADMIN = "ADMIN",
  STUDENT = "STUDENT"
}

export enum BookStatus {
  AVAILABLE="AVAILABLE",
  ISSUED="ISSUED"
}
