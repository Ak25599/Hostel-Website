import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type Query = {
  getUsers: Array<User>;
  me?: Maybe<User>;
  getUser: User;
  getAuthors: Array<Author>;
  getBooks: Array<Book>;
  getBook: Book;
  getEntries: Array<Register>;
  getComplaints: Array<Complaint>;
  getComplaint: Complaint;
};


export type QueryGetUserArgs = {
  email: Scalars['String'];
};


export type QueryGetBooksArgs = {
  type: Scalars['String'];
};


export type QueryGetBookArgs = {
  id: Scalars['String'];
};


export type QueryGetEntriesArgs = {
  offset: Scalars['Int'];
};


export type QueryGetComplaintsArgs = {
  offset: Scalars['Int'];
  type: ComplaintStatus;
};


export type QueryGetComplaintArgs = {
  id: Scalars['String'];
};

export type User = {
  id: Scalars['ID'];
  name: Scalars['String'];
  email: Scalars['String'];
  role: UserRole;
};

export enum UserRole {
  Litsec = 'LITSEC',
  Admin = 'ADMIN',
  Student = 'STUDENT'
}

export type Author = {
  id: Scalars['ID'];
  name: Scalars['String'];
  book: Array<Book>;
};

export type Book = {
  id: Scalars['ID'];
  bookid: Scalars['String'];
  genre: Scalars['String'];
  isbn: Scalars['String'];
  language: Scalars['String'];
  name: Scalars['String'];
  publisher: Scalars['String'];
  year: Scalars['String'];
  status?: Maybe<Scalars['String']>;
  authoredBy: Author;
  register: Array<Register>;
};

export type Register = {
  id: Scalars['ID'];
  studentName: Scalars['String'];
  rollNumber: Scalars['String'];
  book: Book;
  returnStatus?: Maybe<Scalars['Boolean']>;
  issuedDate?: Maybe<Scalars['String']>;
  returnedDate?: Maybe<Scalars['String']>;
};

export type Complaint = {
  id: Scalars['ID'];
  smail: Scalars['String'];
  complaint: Scalars['String'];
  floor: Scalars['String'];
  complaintStatus?: Maybe<ComplaintStatus>;
  roomNumber?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
  complaintDate?: Maybe<Scalars['DateTime']>;
  resolvedDate?: Maybe<Scalars['DateTime']>;
};

export enum ComplaintStatus {
  Pending = 'PENDING',
  Inprogress = 'INPROGRESS',
  Resolved = 'RESOLVED'
}


export type Mutation = {
  createUser: Scalars['String'];
  login?: Maybe<LoginOutput>;
  googleSignIn?: Maybe<GoogleLoginOutput>;
  litSecLogin?: Maybe<LitSecLoginOutput>;
  addBook: Book;
  createAuthor: Author;
  addEntry: Register;
  addExit: Register;
  createComplaint: Complaint;
  getComplaintUploadUrl: GetComplaintUploadUrlOutput;
  setComplaintDownloadUrl: Complaint;
  resolveComplaint: Complaint;
};


export type MutationCreateUserArgs = {
  role: UserRole;
  password: Scalars['String'];
  email: Scalars['String'];
  name: Scalars['String'];
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  email: Scalars['String'];
};


export type MutationGoogleSignInArgs = {
  role: UserRole;
  name: Scalars['String'];
  googleId: Scalars['String'];
  email: Scalars['String'];
};


export type MutationLitSecLoginArgs = {
  password: Scalars['String'];
  email: Scalars['String'];
};


export type MutationAddBookArgs = {
  data: AddBookInput;
};


export type MutationCreateAuthorArgs = {
  name: Scalars['String'];
};


export type MutationAddEntryArgs = {
  data: AddEntryInput;
};


export type MutationAddExitArgs = {
  id: Scalars['String'];
};


export type MutationCreateComplaintArgs = {
  data: CreateComplaintInput;
};


export type MutationGetComplaintUploadUrlArgs = {
  complaintId: Scalars['String'];
  fileName: Scalars['String'];
};


export type MutationSetComplaintDownloadUrlArgs = {
  data: SetComplaintUrlInput;
};


export type MutationResolveComplaintArgs = {
  status: ComplaintStatus;
  id: Scalars['String'];
};

export type LoginOutput = {
  token: Scalars['String'];
  user: User;
};

export type GoogleLoginOutput = {
  token: Scalars['String'];
  user: User;
};

export type LitSecLoginOutput = {
  token: Scalars['String'];
  user: User;
};

export type AddBookInput = {
  bookId: Scalars['String'];
  genre: Scalars['String'];
  isbn: Scalars['String'];
  language: Scalars['String'];
  name: Scalars['String'];
  publisher: Scalars['String'];
  year: Scalars['String'];
  authorId: Scalars['String'];
};

export type AddEntryInput = {
  studentName: Scalars['String'];
  rollNumber: Scalars['String'];
  bookId: Scalars['String'];
};

export type CreateComplaintInput = {
  complaint: Scalars['String'];
  floor: Scalars['String'];
  roomNumber?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
};

export type GetComplaintUploadUrlOutput = {
  uploadUrl: Scalars['String'];
  downloadUrl: Scalars['String'];
};

export type SetComplaintUrlInput = {
  id: Scalars['String'];
  url: Scalars['String'];
};

export type AddBookMutationVariables = Exact<{
  name: Scalars['String'];
  genre: Scalars['String'];
  language: Scalars['String'];
  year: Scalars['String'];
  publisher: Scalars['String'];
  isbn: Scalars['String'];
  bookId: Scalars['String'];
  authorId: Scalars['String'];
}>;


export type AddBookMutation = { addBook: { name: string, genre: string, language: string, year: string, publisher: string, isbn: string, bookid: string, id: string } };

export type AddEntryMutationVariables = Exact<{
  studentName: Scalars['String'];
  rollNumber: Scalars['String'];
  bookId: Scalars['String'];
}>;


export type AddEntryMutation = { addEntry: { studentName: string, rollNumber: string, issuedDate?: Maybe<string>, book: { name: string } } };

export type AddExitMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type AddExitMutation = { addExit: { studentName: string, rollNumber: string, issuedDate?: Maybe<string>, returnedDate?: Maybe<string>, book: { name: string, bookid: string } } };

export type CreateAuthorMutationVariables = Exact<{
  name: Scalars['String'];
}>;


export type CreateAuthorMutation = { createAuthor: { id: string } };

export type CreateComplaintMutationVariables = Exact<{
  description?: Maybe<Scalars['String']>;
  complaint: Scalars['String'];
  roomNumber?: Maybe<Scalars['String']>;
  floor: Scalars['String'];
}>;


export type CreateComplaintMutation = { createComplaint: { id: string, complaint: string, description?: Maybe<string>, smail: string, floor: string } };

export type GetComplaintUploadUrlMutationVariables = Exact<{
  fileName: Scalars['String'];
  complaintId: Scalars['String'];
}>;


export type GetComplaintUploadUrlMutation = { getComplaintUploadUrl: { uploadUrl: string, downloadUrl: string } };

export type GoogleSignInMutationVariables = Exact<{
  email: Scalars['String'];
  name: Scalars['String'];
  googleId: Scalars['String'];
  role: UserRole;
}>;


export type GoogleSignInMutation = { googleSignIn?: Maybe<{ token: string, user: { name: string } }> };

export type LitSecLoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LitSecLoginMutation = { litSecLogin?: Maybe<{ token: string, user: { id: string, role: UserRole, email: string } }> };

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { login?: Maybe<{ token: string, user: { id: string, role: UserRole, email: string } }> };

export type ResolveComplaintMutationVariables = Exact<{
  id: Scalars['String'];
  status: ComplaintStatus;
}>;


export type ResolveComplaintMutation = { resolveComplaint: { id: string, complaint: string, description?: Maybe<string>, smail: string, floor: string, complaintDate?: Maybe<any>, resolvedDate?: Maybe<any>, complaintStatus?: Maybe<ComplaintStatus> } };

export type SetComplaintDownloadUrlMutationVariables = Exact<{
  id: Scalars['String'];
  url: Scalars['String'];
}>;


export type SetComplaintDownloadUrlMutation = { setComplaintDownloadUrl: { id: string } };

export type GetAuthorsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAuthorsQuery = { getAuthors: Array<{ name: string, id: string, book: Array<{ name: string, genre: string, language: string, year: string, publisher: string, isbn: string, bookid: string }> }> };

export type GetBookQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetBookQuery = { getBook: { id: string, name: string, genre: string, year: string, publisher: string, language: string, isbn: string, bookid: string, status?: Maybe<string>, authoredBy: { id: string, name: string, book: Array<{ id: string, name: string }> } } };

export type GetBooksQueryVariables = Exact<{
  type: Scalars['String'];
}>;


export type GetBooksQuery = { getBooks: Array<{ name: string, bookid: string, status?: Maybe<string>, id: string, register: Array<{ id: string, returnStatus?: Maybe<boolean>, book: { id: string } }> }> };

export type GetComplaintQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetComplaintQuery = { getComplaint: { smail: string, complaint: string, floor: string, complaintStatus?: Maybe<ComplaintStatus>, description?: Maybe<string>, complaintDate?: Maybe<any>, url?: Maybe<string>, resolvedDate?: Maybe<any> } };

export type GetComplaintsQueryVariables = Exact<{
  type: ComplaintStatus;
  offset: Scalars['Int'];
}>;


export type GetComplaintsQuery = { getComplaints: Array<{ id: string, smail: string, complaint: string, floor: string, complaintStatus?: Maybe<ComplaintStatus>, description?: Maybe<string>, complaintDate?: Maybe<any>, url?: Maybe<string>, resolvedDate?: Maybe<any> }> };

export type GetEntriesQueryVariables = Exact<{
  offset: Scalars['Int'];
}>;


export type GetEntriesQuery = { getEntries: Array<{ studentName: string, id: string, returnStatus?: Maybe<boolean>, issuedDate?: Maybe<string>, returnedDate?: Maybe<string>, book: { name: string, bookid: string } }> };

export type GetUserQueryVariables = Exact<{
  email: Scalars['String'];
}>;


export type GetUserQuery = { getUser: { id: string, name: string, role: UserRole, email: string } };

export type GetUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUsersQuery = { getUsers: Array<{ id: string, name: string, role: UserRole, email: string }> };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { me?: Maybe<{ id: string, name: string, email: string, role: UserRole }> };


export const AddBookDocument = gql`
    mutation AddBook($name: String!, $genre: String!, $language: String!, $year: String!, $publisher: String!, $isbn: String!, $bookId: String!, $authorId: String!) {
  addBook(data: {name: $name, genre: $genre, language: $language, year: $year, publisher: $publisher, isbn: $isbn, bookId: $bookId, authorId: $authorId}) {
    name
    genre
    language
    year
    publisher
    isbn
    bookid
    id
  }
}
    `;
export type AddBookMutationFn = ApolloReactCommon.MutationFunction<AddBookMutation, AddBookMutationVariables>;
export function useAddBookMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AddBookMutation, AddBookMutationVariables>) {
        return ApolloReactHooks.useMutation<AddBookMutation, AddBookMutationVariables>(AddBookDocument, baseOptions);
      }
export type AddBookMutationHookResult = ReturnType<typeof useAddBookMutation>;
export type AddBookMutationResult = ApolloReactCommon.MutationResult<AddBookMutation>;
export type AddBookMutationOptions = ApolloReactCommon.BaseMutationOptions<AddBookMutation, AddBookMutationVariables>;
export const AddEntryDocument = gql`
    mutation AddEntry($studentName: String!, $rollNumber: String!, $bookId: String!) {
  addEntry(data: {studentName: $studentName, rollNumber: $rollNumber, bookId: $bookId}) {
    studentName
    rollNumber
    issuedDate
    book {
      name
    }
  }
}
    `;
export type AddEntryMutationFn = ApolloReactCommon.MutationFunction<AddEntryMutation, AddEntryMutationVariables>;
export function useAddEntryMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AddEntryMutation, AddEntryMutationVariables>) {
        return ApolloReactHooks.useMutation<AddEntryMutation, AddEntryMutationVariables>(AddEntryDocument, baseOptions);
      }
export type AddEntryMutationHookResult = ReturnType<typeof useAddEntryMutation>;
export type AddEntryMutationResult = ApolloReactCommon.MutationResult<AddEntryMutation>;
export type AddEntryMutationOptions = ApolloReactCommon.BaseMutationOptions<AddEntryMutation, AddEntryMutationVariables>;
export const AddExitDocument = gql`
    mutation AddExit($id: String!) {
  addExit(id: $id) {
    studentName
    rollNumber
    issuedDate
    returnedDate
    book {
      name
      bookid
    }
  }
}
    `;
export type AddExitMutationFn = ApolloReactCommon.MutationFunction<AddExitMutation, AddExitMutationVariables>;
export function useAddExitMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AddExitMutation, AddExitMutationVariables>) {
        return ApolloReactHooks.useMutation<AddExitMutation, AddExitMutationVariables>(AddExitDocument, baseOptions);
      }
export type AddExitMutationHookResult = ReturnType<typeof useAddExitMutation>;
export type AddExitMutationResult = ApolloReactCommon.MutationResult<AddExitMutation>;
export type AddExitMutationOptions = ApolloReactCommon.BaseMutationOptions<AddExitMutation, AddExitMutationVariables>;
export const CreateAuthorDocument = gql`
    mutation CreateAuthor($name: String!) {
  createAuthor(name: $name) {
    id
  }
}
    `;
export type CreateAuthorMutationFn = ApolloReactCommon.MutationFunction<CreateAuthorMutation, CreateAuthorMutationVariables>;
export function useCreateAuthorMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateAuthorMutation, CreateAuthorMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateAuthorMutation, CreateAuthorMutationVariables>(CreateAuthorDocument, baseOptions);
      }
export type CreateAuthorMutationHookResult = ReturnType<typeof useCreateAuthorMutation>;
export type CreateAuthorMutationResult = ApolloReactCommon.MutationResult<CreateAuthorMutation>;
export type CreateAuthorMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateAuthorMutation, CreateAuthorMutationVariables>;
export const CreateComplaintDocument = gql`
    mutation CreateComplaint($description: String, $complaint: String!, $roomNumber: String, $floor: String!) {
  createComplaint(data: {description: $description, complaint: $complaint, roomNumber: $roomNumber, floor: $floor}) {
    id
    complaint
    description
    smail
    floor
  }
}
    `;
export type CreateComplaintMutationFn = ApolloReactCommon.MutationFunction<CreateComplaintMutation, CreateComplaintMutationVariables>;
export function useCreateComplaintMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateComplaintMutation, CreateComplaintMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateComplaintMutation, CreateComplaintMutationVariables>(CreateComplaintDocument, baseOptions);
      }
export type CreateComplaintMutationHookResult = ReturnType<typeof useCreateComplaintMutation>;
export type CreateComplaintMutationResult = ApolloReactCommon.MutationResult<CreateComplaintMutation>;
export type CreateComplaintMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateComplaintMutation, CreateComplaintMutationVariables>;
export const GetComplaintUploadUrlDocument = gql`
    mutation GetComplaintUploadUrl($fileName: String!, $complaintId: String!) {
  getComplaintUploadUrl(fileName: $fileName, complaintId: $complaintId) {
    uploadUrl
    downloadUrl
  }
}
    `;
export type GetComplaintUploadUrlMutationFn = ApolloReactCommon.MutationFunction<GetComplaintUploadUrlMutation, GetComplaintUploadUrlMutationVariables>;
export function useGetComplaintUploadUrlMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<GetComplaintUploadUrlMutation, GetComplaintUploadUrlMutationVariables>) {
        return ApolloReactHooks.useMutation<GetComplaintUploadUrlMutation, GetComplaintUploadUrlMutationVariables>(GetComplaintUploadUrlDocument, baseOptions);
      }
export type GetComplaintUploadUrlMutationHookResult = ReturnType<typeof useGetComplaintUploadUrlMutation>;
export type GetComplaintUploadUrlMutationResult = ApolloReactCommon.MutationResult<GetComplaintUploadUrlMutation>;
export type GetComplaintUploadUrlMutationOptions = ApolloReactCommon.BaseMutationOptions<GetComplaintUploadUrlMutation, GetComplaintUploadUrlMutationVariables>;
export const GoogleSignInDocument = gql`
    mutation GoogleSignIn($email: String!, $name: String!, $googleId: String!, $role: UserRole!) {
  googleSignIn(email: $email, googleId: $googleId, name: $name, role: $role) {
    token
    user {
      name
    }
  }
}
    `;
export type GoogleSignInMutationFn = ApolloReactCommon.MutationFunction<GoogleSignInMutation, GoogleSignInMutationVariables>;
export function useGoogleSignInMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<GoogleSignInMutation, GoogleSignInMutationVariables>) {
        return ApolloReactHooks.useMutation<GoogleSignInMutation, GoogleSignInMutationVariables>(GoogleSignInDocument, baseOptions);
      }
export type GoogleSignInMutationHookResult = ReturnType<typeof useGoogleSignInMutation>;
export type GoogleSignInMutationResult = ApolloReactCommon.MutationResult<GoogleSignInMutation>;
export type GoogleSignInMutationOptions = ApolloReactCommon.BaseMutationOptions<GoogleSignInMutation, GoogleSignInMutationVariables>;
export const LitSecLoginDocument = gql`
    mutation LitSecLogin($email: String!, $password: String!) {
  litSecLogin(email: $email, password: $password) {
    token
    user {
      id
      role
      email
    }
  }
}
    `;
export type LitSecLoginMutationFn = ApolloReactCommon.MutationFunction<LitSecLoginMutation, LitSecLoginMutationVariables>;
export function useLitSecLoginMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<LitSecLoginMutation, LitSecLoginMutationVariables>) {
        return ApolloReactHooks.useMutation<LitSecLoginMutation, LitSecLoginMutationVariables>(LitSecLoginDocument, baseOptions);
      }
export type LitSecLoginMutationHookResult = ReturnType<typeof useLitSecLoginMutation>;
export type LitSecLoginMutationResult = ApolloReactCommon.MutationResult<LitSecLoginMutation>;
export type LitSecLoginMutationOptions = ApolloReactCommon.BaseMutationOptions<LitSecLoginMutation, LitSecLoginMutationVariables>;
export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
    user {
      id
      role
      email
    }
  }
}
    `;
export type LoginMutationFn = ApolloReactCommon.MutationFunction<LoginMutation, LoginMutationVariables>;
export function useLoginMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        return ApolloReactHooks.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, baseOptions);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = ApolloReactCommon.MutationResult<LoginMutation>;
export type LoginMutationOptions = ApolloReactCommon.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const ResolveComplaintDocument = gql`
    mutation ResolveComplaint($id: String!, $status: ComplaintStatus!) {
  resolveComplaint(id: $id, status: $status) {
    id
    complaint
    description
    smail
    floor
    complaintDate
    resolvedDate
    complaintStatus
  }
}
    `;
export type ResolveComplaintMutationFn = ApolloReactCommon.MutationFunction<ResolveComplaintMutation, ResolveComplaintMutationVariables>;
export function useResolveComplaintMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<ResolveComplaintMutation, ResolveComplaintMutationVariables>) {
        return ApolloReactHooks.useMutation<ResolveComplaintMutation, ResolveComplaintMutationVariables>(ResolveComplaintDocument, baseOptions);
      }
export type ResolveComplaintMutationHookResult = ReturnType<typeof useResolveComplaintMutation>;
export type ResolveComplaintMutationResult = ApolloReactCommon.MutationResult<ResolveComplaintMutation>;
export type ResolveComplaintMutationOptions = ApolloReactCommon.BaseMutationOptions<ResolveComplaintMutation, ResolveComplaintMutationVariables>;
export const SetComplaintDownloadUrlDocument = gql`
    mutation SetComplaintDownloadUrl($id: String!, $url: String!) {
  setComplaintDownloadUrl(data: {id: $id, url: $url}) {
    id
  }
}
    `;
export type SetComplaintDownloadUrlMutationFn = ApolloReactCommon.MutationFunction<SetComplaintDownloadUrlMutation, SetComplaintDownloadUrlMutationVariables>;
export function useSetComplaintDownloadUrlMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SetComplaintDownloadUrlMutation, SetComplaintDownloadUrlMutationVariables>) {
        return ApolloReactHooks.useMutation<SetComplaintDownloadUrlMutation, SetComplaintDownloadUrlMutationVariables>(SetComplaintDownloadUrlDocument, baseOptions);
      }
export type SetComplaintDownloadUrlMutationHookResult = ReturnType<typeof useSetComplaintDownloadUrlMutation>;
export type SetComplaintDownloadUrlMutationResult = ApolloReactCommon.MutationResult<SetComplaintDownloadUrlMutation>;
export type SetComplaintDownloadUrlMutationOptions = ApolloReactCommon.BaseMutationOptions<SetComplaintDownloadUrlMutation, SetComplaintDownloadUrlMutationVariables>;
export const GetAuthorsDocument = gql`
    query GetAuthors {
  getAuthors {
    name
    id
    book {
      name
      genre
      language
      year
      publisher
      isbn
      bookid
    }
  }
}
    `;
export function useGetAuthorsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetAuthorsQuery, GetAuthorsQueryVariables>) {
        return ApolloReactHooks.useQuery<GetAuthorsQuery, GetAuthorsQueryVariables>(GetAuthorsDocument, baseOptions);
      }
export function useGetAuthorsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetAuthorsQuery, GetAuthorsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetAuthorsQuery, GetAuthorsQueryVariables>(GetAuthorsDocument, baseOptions);
        }
export type GetAuthorsQueryHookResult = ReturnType<typeof useGetAuthorsQuery>;
export type GetAuthorsLazyQueryHookResult = ReturnType<typeof useGetAuthorsLazyQuery>;
export type GetAuthorsQueryResult = ApolloReactCommon.QueryResult<GetAuthorsQuery, GetAuthorsQueryVariables>;
export function refetchGetAuthorsQuery(variables?: GetAuthorsQueryVariables) {
      return { query: GetAuthorsDocument, variables: variables }
    }
export const GetBookDocument = gql`
    query GetBook($id: String!) {
  getBook(id: $id) {
    id
    name
    genre
    year
    publisher
    language
    isbn
    bookid
    status
    authoredBy {
      id
      name
      book {
        id
        name
      }
    }
  }
}
    `;
export function useGetBookQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetBookQuery, GetBookQueryVariables>) {
        return ApolloReactHooks.useQuery<GetBookQuery, GetBookQueryVariables>(GetBookDocument, baseOptions);
      }
export function useGetBookLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetBookQuery, GetBookQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetBookQuery, GetBookQueryVariables>(GetBookDocument, baseOptions);
        }
export type GetBookQueryHookResult = ReturnType<typeof useGetBookQuery>;
export type GetBookLazyQueryHookResult = ReturnType<typeof useGetBookLazyQuery>;
export type GetBookQueryResult = ApolloReactCommon.QueryResult<GetBookQuery, GetBookQueryVariables>;
export function refetchGetBookQuery(variables?: GetBookQueryVariables) {
      return { query: GetBookDocument, variables: variables }
    }
export const GetBooksDocument = gql`
    query GetBooks($type: String!) {
  getBooks(type: $type) {
    name
    bookid
    status
    id
    register {
      id
      returnStatus
      book {
        id
      }
    }
  }
}
    `;
export function useGetBooksQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetBooksQuery, GetBooksQueryVariables>) {
        return ApolloReactHooks.useQuery<GetBooksQuery, GetBooksQueryVariables>(GetBooksDocument, baseOptions);
      }
export function useGetBooksLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetBooksQuery, GetBooksQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetBooksQuery, GetBooksQueryVariables>(GetBooksDocument, baseOptions);
        }
export type GetBooksQueryHookResult = ReturnType<typeof useGetBooksQuery>;
export type GetBooksLazyQueryHookResult = ReturnType<typeof useGetBooksLazyQuery>;
export type GetBooksQueryResult = ApolloReactCommon.QueryResult<GetBooksQuery, GetBooksQueryVariables>;
export function refetchGetBooksQuery(variables?: GetBooksQueryVariables) {
      return { query: GetBooksDocument, variables: variables }
    }
export const GetComplaintDocument = gql`
    query GetComplaint($id: String!) {
  getComplaint(id: $id) {
    smail
    complaint
    floor
    complaintStatus
    description
    complaintDate
    url
    resolvedDate
  }
}
    `;
export function useGetComplaintQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetComplaintQuery, GetComplaintQueryVariables>) {
        return ApolloReactHooks.useQuery<GetComplaintQuery, GetComplaintQueryVariables>(GetComplaintDocument, baseOptions);
      }
export function useGetComplaintLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetComplaintQuery, GetComplaintQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetComplaintQuery, GetComplaintQueryVariables>(GetComplaintDocument, baseOptions);
        }
export type GetComplaintQueryHookResult = ReturnType<typeof useGetComplaintQuery>;
export type GetComplaintLazyQueryHookResult = ReturnType<typeof useGetComplaintLazyQuery>;
export type GetComplaintQueryResult = ApolloReactCommon.QueryResult<GetComplaintQuery, GetComplaintQueryVariables>;
export function refetchGetComplaintQuery(variables?: GetComplaintQueryVariables) {
      return { query: GetComplaintDocument, variables: variables }
    }
export const GetComplaintsDocument = gql`
    query GetComplaints($type: ComplaintStatus!, $offset: Int!) {
  getComplaints(type: $type, offset: $offset) {
    id
    smail
    complaint
    floor
    complaintStatus
    description
    complaintDate
    url
    resolvedDate
  }
}
    `;
export function useGetComplaintsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetComplaintsQuery, GetComplaintsQueryVariables>) {
        return ApolloReactHooks.useQuery<GetComplaintsQuery, GetComplaintsQueryVariables>(GetComplaintsDocument, baseOptions);
      }
export function useGetComplaintsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetComplaintsQuery, GetComplaintsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetComplaintsQuery, GetComplaintsQueryVariables>(GetComplaintsDocument, baseOptions);
        }
export type GetComplaintsQueryHookResult = ReturnType<typeof useGetComplaintsQuery>;
export type GetComplaintsLazyQueryHookResult = ReturnType<typeof useGetComplaintsLazyQuery>;
export type GetComplaintsQueryResult = ApolloReactCommon.QueryResult<GetComplaintsQuery, GetComplaintsQueryVariables>;
export function refetchGetComplaintsQuery(variables?: GetComplaintsQueryVariables) {
      return { query: GetComplaintsDocument, variables: variables }
    }
export const GetEntriesDocument = gql`
    query GetEntries($offset: Int!) {
  getEntries(offset: $offset) {
    studentName
    id
    returnStatus
    issuedDate
    returnedDate
    book {
      name
      bookid
    }
  }
}
    `;
export function useGetEntriesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetEntriesQuery, GetEntriesQueryVariables>) {
        return ApolloReactHooks.useQuery<GetEntriesQuery, GetEntriesQueryVariables>(GetEntriesDocument, baseOptions);
      }
export function useGetEntriesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetEntriesQuery, GetEntriesQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetEntriesQuery, GetEntriesQueryVariables>(GetEntriesDocument, baseOptions);
        }
export type GetEntriesQueryHookResult = ReturnType<typeof useGetEntriesQuery>;
export type GetEntriesLazyQueryHookResult = ReturnType<typeof useGetEntriesLazyQuery>;
export type GetEntriesQueryResult = ApolloReactCommon.QueryResult<GetEntriesQuery, GetEntriesQueryVariables>;
export function refetchGetEntriesQuery(variables?: GetEntriesQueryVariables) {
      return { query: GetEntriesDocument, variables: variables }
    }
export const GetUserDocument = gql`
    query GetUser($email: String!) {
  getUser(email: $email) {
    id
    name
    role
    email
  }
}
    `;
export function useGetUserQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
        return ApolloReactHooks.useQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, baseOptions);
      }
export function useGetUserLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, baseOptions);
        }
export type GetUserQueryHookResult = ReturnType<typeof useGetUserQuery>;
export type GetUserLazyQueryHookResult = ReturnType<typeof useGetUserLazyQuery>;
export type GetUserQueryResult = ApolloReactCommon.QueryResult<GetUserQuery, GetUserQueryVariables>;
export function refetchGetUserQuery(variables?: GetUserQueryVariables) {
      return { query: GetUserDocument, variables: variables }
    }
export const GetUsersDocument = gql`
    query GetUsers {
  getUsers {
    id
    name
    role
    email
  }
}
    `;
export function useGetUsersQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
        return ApolloReactHooks.useQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, baseOptions);
      }
export function useGetUsersLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, baseOptions);
        }
export type GetUsersQueryHookResult = ReturnType<typeof useGetUsersQuery>;
export type GetUsersLazyQueryHookResult = ReturnType<typeof useGetUsersLazyQuery>;
export type GetUsersQueryResult = ApolloReactCommon.QueryResult<GetUsersQuery, GetUsersQueryVariables>;
export function refetchGetUsersQuery(variables?: GetUsersQueryVariables) {
      return { query: GetUsersDocument, variables: variables }
    }
export const MeDocument = gql`
    query Me {
  me {
    id
    name
    email
    role
  }
}
    `;
export function useMeQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<MeQuery, MeQueryVariables>) {
        return ApolloReactHooks.useQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
      }
export function useMeLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = ApolloReactCommon.QueryResult<MeQuery, MeQueryVariables>;
export function refetchMeQuery(variables?: MeQueryVariables) {
      return { query: MeDocument, variables: variables }
    }