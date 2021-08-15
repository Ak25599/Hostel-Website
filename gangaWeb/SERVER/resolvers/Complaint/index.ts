import { CreateComplaint } from "./CreateComplaint";
import { GetComplaints } from "./GetComplaints";
import { GetComplaint } from "./GetComplaint";
import { ComplaintFieldResolvers } from "./FieldResolvers";
import GetComplaintUploadUrl from "./GetUploadUrl";
import { SetComplaintDownloadUrl } from "./SetDownloadUrl";
import { ResolveComplaint } from "./ResolveComplaint";
export default [
  CreateComplaint,
  GetComplaints,
  GetComplaint,
  ComplaintFieldResolvers,
  ResolveComplaint,
  GetComplaintUploadUrl,
  SetComplaintDownloadUrl,
];
