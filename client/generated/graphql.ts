import { GraphQLClient } from 'graphql-request';
import { RequestInit } from 'graphql-request/dist/types.dom';
import { useQuery, useMutation, UseQueryOptions, UseMutationOptions } from 'react-query';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };

function fetcher<TData, TVariables>(client: GraphQLClient, query: string, variables?: TVariables, headers?: RequestInit['headers']) {
  return async (): Promise<TData> => client.request<TData, TVariables>(query, variables, headers);
}
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

export type Department = {
  __typename?: 'Department';
  _id: Scalars['String'];
  admin: Scalars['String'];
  departmentName: Scalars['String'];
};

export type DepartmentInput = {
  admin: Scalars['String'];
  departmentName: Scalars['String'];
};

export type DepartmentListResponse = {
  __typename?: 'DepartmentListResponse';
  departments: Array<Department>;
  results: Scalars['Float'];
  status: Scalars['String'];
};

export type DepartmentResponse = {
  __typename?: 'DepartmentResponse';
  department: Department;
  status: Scalars['String'];
};

export type Departmentfilter = {
  limit?: InputMaybe<Scalars['Float']>;
  page?: InputMaybe<Scalars['Float']>;
};

export type Equipment = {
  expiryDate: Scalars['String'];
  name: Scalars['String'];
  qty: Scalars['String'];
};

export type EquipmentData = {
  __typename?: 'EquipmentData';
  expiryDate: Scalars['String'];
  name: Scalars['String'];
  qty: Scalars['String'];
};

export type InventoryResponse = {
  __typename?: 'InventoryResponse';
  status: Scalars['String'];
};

export type LoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  access_token: Scalars['String'];
  status: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  UpdateCaregiver: UserResponse;
  UpdateUser: UserResponse;
  createDepartment: DepartmentResponse;
  createInventory: InventoryResponse;
  createQuestion: QuestionResponse;
  createService: ServiceResponse;
  deleteDepartment: Scalars['Boolean'];
  deleteService: Scalars['Boolean'];
  loginUser: LoginResponse;
  signupUser: UserResponse;
  updateService: ServiceResponse;
  updateTrolley: ServiceResponse;
};


export type MutationUpdateCaregiverArgs = {
  input: UpdateCaregiverInput;
};


export type MutationUpdateUserArgs = {
  input: SignUpInput;
};


export type MutationCreateDepartmentArgs = {
  input: DepartmentInput;
};


export type MutationCreateInventoryArgs = {
  input: InventoryInput;
};


export type MutationCreateQuestionArgs = {
  input: QuestionInput;
};


export type MutationCreateServiceArgs = {
  input: ServiceInput;
};


export type MutationDeleteDepartmentArgs = {
  id: Scalars['String'];
};


export type MutationDeleteServiceArgs = {
  id: Scalars['String'];
};


export type MutationLoginUserArgs = {
  input: LoginInput;
};


export type MutationSignupUserArgs = {
  input: SignUpInput;
};


export type MutationUpdateServiceArgs = {
  id: Scalars['String'];
  input: UpdateServiceInput;
};


export type MutationUpdateTrolleyArgs = {
  input: ServiceUpdateTrolleyInput;
};

export type Query = {
  __typename?: 'Query';
  getCaregiver: UserResponse;
  getCaregivers: UsersResponse;
  getDepartmentByAdmin: DepartmentResponse;
  getDepartments: DepartmentListResponse;
  getMe: UserResponse;
  getService: ServicePopulatedResponse;
  getServicebyAdmin: ServiceListResponse;
  getServices: ServiceListResponse;
  logoutUser: Scalars['Boolean'];
  refreshAccessToken: LoginResponse;
};


export type QueryGetCaregiverArgs = {
  id: Scalars['String'];
};


export type QueryGetDepartmentByAdminArgs = {
  email: Scalars['String'];
};


export type QueryGetDepartmentsArgs = {
  input?: InputMaybe<Departmentfilter>;
};


export type QueryGetServiceArgs = {
  id: Scalars['String'];
};


export type QueryGetServicebyAdminArgs = {
  email: Scalars['String'];
};


export type QueryGetServicesArgs = {
  input?: InputMaybe<ServiceFilter>;
};

export type QuestionResponse = {
  __typename?: 'QuestionResponse';
  status: Scalars['String'];
};

export type ServiceData = {
  __typename?: 'ServiceData';
  _id: Scalars['String'];
  admin: Scalars['String'];
  assignedAt?: Maybe<Scalars['String']>;
  assignedTo: Scalars['String'];
  dailyTap: Array<Scalars['Boolean']>;
  dailyTapDoneAt?: Maybe<Array<Scalars['String']>>;
  image: Scalars['String'];
  monthlyTap: Array<Scalars['Boolean']>;
  monthlyTapDoneAt?: Maybe<Array<Scalars['String']>>;
  serviceName: Scalars['String'];
  trolleyFour: Array<EquipmentData>;
  trolleyOne: Array<EquipmentData>;
  trolleyThree: Array<EquipmentData>;
  trolleyTwo: Array<EquipmentData>;
};

export type ServiceFilter = {
  limit?: InputMaybe<Scalars['Float']>;
  page?: InputMaybe<Scalars['Float']>;
};

export type ServiceInput = {
  admin: Scalars['String'];
  assignedAt?: InputMaybe<Scalars['String']>;
  assignedTo?: InputMaybe<Scalars['String']>;
  dailyTap?: InputMaybe<Array<Scalars['Boolean']>>;
  dailyTapDoneAt?: InputMaybe<Array<Scalars['String']>>;
  image?: InputMaybe<Scalars['String']>;
  monthlyTap?: InputMaybe<Array<Scalars['Boolean']>>;
  monthlyTapDoneAt?: InputMaybe<Array<Scalars['String']>>;
  serviceName: Scalars['String'];
  trolleyFour: Array<Equipment>;
  trolleyOne: Array<Equipment>;
  trolleyThree: Array<Equipment>;
  trolleyTwo: Array<Equipment>;
};

export type ServiceListResponse = {
  __typename?: 'ServiceListResponse';
  results: Scalars['Float'];
  services: Array<ServicePopulatedData>;
  status: Scalars['String'];
};

export type ServicePopulatedData = {
  __typename?: 'ServicePopulatedData';
  _id: Scalars['String'];
  admin: Scalars['String'];
  assignedAt?: Maybe<Scalars['String']>;
  assignedTo: Scalars['String'];
  dailyTap: Array<Scalars['Boolean']>;
  dailyTapDoneAt?: Maybe<Array<Scalars['String']>>;
  image: Scalars['String'];
  monthlyTap: Array<Scalars['Boolean']>;
  monthlyTapDoneAt?: Maybe<Array<Scalars['String']>>;
  service: ServiceData;
  serviceName: Scalars['String'];
  trolleyFour: Array<EquipmentData>;
  trolleyOne: Array<EquipmentData>;
  trolleyThree: Array<EquipmentData>;
  trolleyTwo: Array<EquipmentData>;
};

export type ServicePopulatedResponse = {
  __typename?: 'ServicePopulatedResponse';
  service: ServicePopulatedData;
  status: Scalars['String'];
};

export type ServiceResponse = {
  __typename?: 'ServiceResponse';
  service: ServiceData;
  status: Scalars['String'];
};

export type ServiceUpdateTrolleyInput = {
  _id: Scalars['String'];
  admin: Scalars['String'];
  assignedAt?: InputMaybe<Scalars['String']>;
  assignedTo?: InputMaybe<Scalars['String']>;
  dailyTap?: InputMaybe<Array<Scalars['Boolean']>>;
  dailyTapDoneAt?: InputMaybe<Array<Scalars['String']>>;
  image?: InputMaybe<Scalars['String']>;
  monthlyTap?: InputMaybe<Array<Scalars['Boolean']>>;
  monthlyTapDoneAt?: InputMaybe<Array<Scalars['String']>>;
  serviceName: Scalars['String'];
  trolleyFour: Array<Equipment>;
  trolleyOne: Array<Equipment>;
  trolleyThree: Array<Equipment>;
  trolleyTwo: Array<Equipment>;
};

export type SignUpInput = {
  email: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
  passwordConfirm: Scalars['String'];
  role: Scalars['String'];
};

export type UpdateCaregiverInput = {
  _id: Scalars['String'];
  email: Scalars['String'];
  name: Scalars['String'];
  role: Scalars['String'];
};

export type UpdateServiceInput = {
  assignedAt?: InputMaybe<Scalars['String']>;
  assignedTo?: InputMaybe<Scalars['String']>;
  dailyTap?: InputMaybe<Array<Scalars['Boolean']>>;
  dailyTapDoneAt?: InputMaybe<Array<Scalars['String']>>;
  monthlyTap?: InputMaybe<Array<Scalars['Boolean']>>;
  monthlyTapDoneAt?: InputMaybe<Array<Scalars['String']>>;
};

export type UserData = {
  __typename?: 'UserData';
  _id: Scalars['String'];
  createdAt: Scalars['DateTime'];
  email: Scalars['String'];
  id?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  role: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  status: Scalars['String'];
  user: UserData;
};

export type UsersResponse = {
  __typename?: 'UsersResponse';
  user: Array<UserData>;
};

export type InventoryInput = {
  data: Scalars['String'];
};

export type QuestionInput = {
  data: Scalars['String'];
};

export type GetMeQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMeQuery = { __typename?: 'Query', getMe: { __typename?: 'UserResponse', status: string, user: { __typename?: 'UserData', _id: string, id?: string | null, email: string, name: string, role: string, updatedAt: any, createdAt: any } } };

export type LoginUserMutationVariables = Exact<{
  input: LoginInput;
}>;


export type LoginUserMutation = { __typename?: 'Mutation', loginUser: { __typename?: 'LoginResponse', status: string, access_token: string } };

export type LogoutUserQueryVariables = Exact<{ [key: string]: never; }>;


export type LogoutUserQuery = { __typename?: 'Query', logoutUser: boolean };

export type RefreshAccessTokenQueryVariables = Exact<{ [key: string]: never; }>;


export type RefreshAccessTokenQuery = { __typename?: 'Query', refreshAccessToken: { __typename?: 'LoginResponse', status: string, access_token: string } };

export type SignUpUserMutationVariables = Exact<{
  input: SignUpInput;
}>;


export type SignUpUserMutation = { __typename?: 'Mutation', signupUser: { __typename?: 'UserResponse', status: string, user: { __typename?: 'UserData', name: string, email: string, role: string } } };

export type UpdateCaregiverMutationVariables = Exact<{
  input: UpdateCaregiverInput;
}>;


export type UpdateCaregiverMutation = { __typename?: 'Mutation', UpdateCaregiver: { __typename?: 'UserResponse', status: string, user: { __typename?: 'UserData', name: string, email: string, role: string } } };

export type UpdateTrolleyMutationVariables = Exact<{
  input: ServiceUpdateTrolleyInput;
}>;


export type UpdateTrolleyMutation = { __typename?: 'Mutation', updateTrolley: { __typename?: 'ServiceResponse', status: string, service: { __typename?: 'ServiceData', serviceName: string, assignedTo: string, assignedAt?: string | null, admin: string, image: string } } };

export type UpdateUserMutationVariables = Exact<{
  input: SignUpInput;
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', UpdateUser: { __typename?: 'UserResponse', status: string, user: { __typename?: 'UserData', name: string, email: string, role: string } } };

export type CreateDepartmentMutationVariables = Exact<{
  input: DepartmentInput;
}>;


export type CreateDepartmentMutation = { __typename?: 'Mutation', createDepartment: { __typename?: 'DepartmentResponse', status: string, department: { __typename?: 'Department', departmentName: string, admin: string } } };

export type CreateInventoryMutationVariables = Exact<{
  input: InventoryInput;
}>;


export type CreateInventoryMutation = { __typename?: 'Mutation', createInventory: { __typename?: 'InventoryResponse', status: string } };

export type CreateQuestionMutationVariables = Exact<{
  input: QuestionInput;
}>;


export type CreateQuestionMutation = { __typename?: 'Mutation', createQuestion: { __typename?: 'QuestionResponse', status: string } };

export type CreateServiceMutationVariables = Exact<{
  input: ServiceInput;
}>;


export type CreateServiceMutation = { __typename?: 'Mutation', createService: { __typename?: 'ServiceResponse', status: string, service: { __typename?: 'ServiceData', serviceName: string, assignedTo: string, assignedAt?: string | null, admin: string, image: string } } };

export type DeleteDepartmentMutationVariables = Exact<{
  deleteDepartmentId: Scalars['String'];
}>;


export type DeleteDepartmentMutation = { __typename?: 'Mutation', deleteDepartment: boolean };

export type DeleteServiceMutationVariables = Exact<{
  deleteServiceId: Scalars['String'];
}>;


export type DeleteServiceMutation = { __typename?: 'Mutation', deleteService: boolean };

export type GetCaregiverQueryVariables = Exact<{
  getCaregiver: Scalars['String'];
}>;


export type GetCaregiverQuery = { __typename?: 'Query', getCaregiver: { __typename?: 'UserResponse', status: string, user: { __typename?: 'UserData', _id: string, id?: string | null, email: string, name: string, role: string, updatedAt: any, createdAt: any } } };

export type GetCaregiversQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCaregiversQuery = { __typename?: 'Query', getCaregivers: { __typename?: 'UsersResponse', user: Array<{ __typename?: 'UserData', _id: string, id?: string | null, email: string, name: string, role: string, updatedAt: any, createdAt: any }> } };

export type GetDepartmentByAdminQueryVariables = Exact<{
  getDepartmentByAdmin: Scalars['String'];
}>;


export type GetDepartmentByAdminQuery = { __typename?: 'Query', getDepartmentByAdmin: { __typename?: 'DepartmentResponse', status: string, department: { __typename?: 'Department', departmentName: string, admin: string } } };

export type GetDepartmentsQueryVariables = Exact<{
  input: Departmentfilter;
}>;


export type GetDepartmentsQuery = { __typename?: 'Query', getDepartments: { __typename?: 'DepartmentListResponse', status: string, results: number, departments: Array<{ __typename?: 'Department', _id: string, departmentName: string, admin: string }> } };

export type GetServicebyAdminQueryVariables = Exact<{
  getServicebyAdmin: Scalars['String'];
}>;


export type GetServicebyAdminQuery = { __typename?: 'Query', getServicebyAdmin: { __typename?: 'ServiceListResponse', status: string, services: Array<{ __typename?: 'ServicePopulatedData', _id: string, serviceName: string, assignedTo: string, assignedAt?: string | null, admin: string, image: string, trolleyOne: Array<{ __typename?: 'EquipmentData', name: string, expiryDate: string, qty: string }>, trolleyTwo: Array<{ __typename?: 'EquipmentData', name: string, expiryDate: string, qty: string }>, trolleyThree: Array<{ __typename?: 'EquipmentData', name: string, expiryDate: string, qty: string }>, trolleyFour: Array<{ __typename?: 'EquipmentData', name: string, expiryDate: string, qty: string }> }> } };

export type GetServiceQueryVariables = Exact<{
  getServiceId: Scalars['String'];
}>;


export type GetServiceQuery = { __typename?: 'Query', getService: { __typename?: 'ServicePopulatedResponse', status: string, service: { __typename?: 'ServicePopulatedData', _id: string, serviceName: string, assignedTo: string, assignedAt?: string | null, admin: string, image: string, trolleyOne: Array<{ __typename?: 'EquipmentData', name: string, expiryDate: string, qty: string }>, trolleyTwo: Array<{ __typename?: 'EquipmentData', name: string, expiryDate: string, qty: string }>, trolleyThree: Array<{ __typename?: 'EquipmentData', name: string, expiryDate: string, qty: string }>, trolleyFour: Array<{ __typename?: 'EquipmentData', name: string, expiryDate: string, qty: string }> } } };

export type GetServicesQueryVariables = Exact<{
  input: ServiceFilter;
}>;


export type GetServicesQuery = { __typename?: 'Query', getServices: { __typename?: 'ServiceListResponse', status: string, results: number, services: Array<{ __typename?: 'ServicePopulatedData', _id: string, serviceName: string, assignedTo: string, assignedAt?: string | null, admin: string, trolleyOne: Array<{ __typename?: 'EquipmentData', name: string, expiryDate: string, qty: string }>, trolleyTwo: Array<{ __typename?: 'EquipmentData', name: string, expiryDate: string, qty: string }>, trolleyThree: Array<{ __typename?: 'EquipmentData', name: string, expiryDate: string, qty: string }>, trolleyFour: Array<{ __typename?: 'EquipmentData', name: string, expiryDate: string, qty: string }> }> } };

export type UpdateServiceMutationVariables = Exact<{
  input: UpdateServiceInput;
  updateServiceId: Scalars['String'];
}>;


export type UpdateServiceMutation = { __typename?: 'Mutation', updateService: { __typename?: 'ServiceResponse', status: string, service: { __typename?: 'ServiceData', assignedAt?: string | null, admin: string } } };


export const GetMeDocument = `
    query GetMe {
  getMe {
    status
    user {
      _id
      id
      email
      name
      role
      updatedAt
      createdAt
    }
  }
}
    `;
export const useGetMeQuery = <
      TData = GetMeQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: GetMeQueryVariables,
      options?: UseQueryOptions<GetMeQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<GetMeQuery, TError, TData>(
      variables === undefined ? ['GetMe'] : ['GetMe', variables],
      fetcher<GetMeQuery, GetMeQueryVariables>(client, GetMeDocument, variables, headers),
      options
    );
export const LoginUserDocument = `
    mutation LoginUser($input: LoginInput!) {
  loginUser(input: $input) {
    status
    access_token
  }
}
    `;
export const useLoginUserMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<LoginUserMutation, TError, LoginUserMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<LoginUserMutation, TError, LoginUserMutationVariables, TContext>(
      ['LoginUser'],
      (variables?: LoginUserMutationVariables) => fetcher<LoginUserMutation, LoginUserMutationVariables>(client, LoginUserDocument, variables, headers)(),
      options
    );
export const LogoutUserDocument = `
    query LogoutUser {
  logoutUser
}
    `;
export const useLogoutUserQuery = <
      TData = LogoutUserQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: LogoutUserQueryVariables,
      options?: UseQueryOptions<LogoutUserQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<LogoutUserQuery, TError, TData>(
      variables === undefined ? ['LogoutUser'] : ['LogoutUser', variables],
      fetcher<LogoutUserQuery, LogoutUserQueryVariables>(client, LogoutUserDocument, variables, headers),
      options
    );
export const RefreshAccessTokenDocument = `
    query RefreshAccessToken {
  refreshAccessToken {
    status
    access_token
  }
}
    `;
export const useRefreshAccessTokenQuery = <
      TData = RefreshAccessTokenQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: RefreshAccessTokenQueryVariables,
      options?: UseQueryOptions<RefreshAccessTokenQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<RefreshAccessTokenQuery, TError, TData>(
      variables === undefined ? ['RefreshAccessToken'] : ['RefreshAccessToken', variables],
      fetcher<RefreshAccessTokenQuery, RefreshAccessTokenQueryVariables>(client, RefreshAccessTokenDocument, variables, headers),
      options
    );
export const SignUpUserDocument = `
    mutation SignUpUser($input: SignUpInput!) {
  signupUser(input: $input) {
    status
    user {
      name
      email
      role
    }
  }
}
    `;
export const useSignUpUserMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<SignUpUserMutation, TError, SignUpUserMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<SignUpUserMutation, TError, SignUpUserMutationVariables, TContext>(
      ['SignUpUser'],
      (variables?: SignUpUserMutationVariables) => fetcher<SignUpUserMutation, SignUpUserMutationVariables>(client, SignUpUserDocument, variables, headers)(),
      options
    );
export const UpdateCaregiverDocument = `
    mutation UpdateCaregiver($input: UpdateCaregiverInput!) {
  UpdateCaregiver(input: $input) {
    status
    user {
      name
      email
      role
    }
  }
}
    `;
export const useUpdateCaregiverMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<UpdateCaregiverMutation, TError, UpdateCaregiverMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<UpdateCaregiverMutation, TError, UpdateCaregiverMutationVariables, TContext>(
      ['UpdateCaregiver'],
      (variables?: UpdateCaregiverMutationVariables) => fetcher<UpdateCaregiverMutation, UpdateCaregiverMutationVariables>(client, UpdateCaregiverDocument, variables, headers)(),
      options
    );
export const UpdateTrolleyDocument = `
    mutation updateTrolley($input: ServiceUpdateTrolleyInput!) {
  updateTrolley(input: $input) {
    status
    service {
      serviceName
      assignedTo
      assignedAt
      admin
      image
    }
  }
}
    `;
export const useUpdateTrolleyMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<UpdateTrolleyMutation, TError, UpdateTrolleyMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<UpdateTrolleyMutation, TError, UpdateTrolleyMutationVariables, TContext>(
      ['updateTrolley'],
      (variables?: UpdateTrolleyMutationVariables) => fetcher<UpdateTrolleyMutation, UpdateTrolleyMutationVariables>(client, UpdateTrolleyDocument, variables, headers)(),
      options
    );
export const UpdateUserDocument = `
    mutation UpdateUser($input: SignUpInput!) {
  UpdateUser(input: $input) {
    status
    user {
      name
      email
      role
    }
  }
}
    `;
export const useUpdateUserMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<UpdateUserMutation, TError, UpdateUserMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<UpdateUserMutation, TError, UpdateUserMutationVariables, TContext>(
      ['UpdateUser'],
      (variables?: UpdateUserMutationVariables) => fetcher<UpdateUserMutation, UpdateUserMutationVariables>(client, UpdateUserDocument, variables, headers)(),
      options
    );
export const CreateDepartmentDocument = `
    mutation createDepartment($input: DepartmentInput!) {
  createDepartment(input: $input) {
    status
    department {
      departmentName
      admin
    }
  }
}
    `;
export const useCreateDepartmentMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<CreateDepartmentMutation, TError, CreateDepartmentMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<CreateDepartmentMutation, TError, CreateDepartmentMutationVariables, TContext>(
      ['createDepartment'],
      (variables?: CreateDepartmentMutationVariables) => fetcher<CreateDepartmentMutation, CreateDepartmentMutationVariables>(client, CreateDepartmentDocument, variables, headers)(),
      options
    );
export const CreateInventoryDocument = `
    mutation createInventory($input: inventoryInput!) {
  createInventory(input: $input) {
    status
  }
}
    `;
export const useCreateInventoryMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<CreateInventoryMutation, TError, CreateInventoryMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<CreateInventoryMutation, TError, CreateInventoryMutationVariables, TContext>(
      ['createInventory'],
      (variables?: CreateInventoryMutationVariables) => fetcher<CreateInventoryMutation, CreateInventoryMutationVariables>(client, CreateInventoryDocument, variables, headers)(),
      options
    );
export const CreateQuestionDocument = `
    mutation createQuestion($input: questionInput!) {
  createQuestion(input: $input) {
    status
  }
}
    `;
export const useCreateQuestionMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<CreateQuestionMutation, TError, CreateQuestionMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<CreateQuestionMutation, TError, CreateQuestionMutationVariables, TContext>(
      ['createQuestion'],
      (variables?: CreateQuestionMutationVariables) => fetcher<CreateQuestionMutation, CreateQuestionMutationVariables>(client, CreateQuestionDocument, variables, headers)(),
      options
    );
export const CreateServiceDocument = `
    mutation createService($input: ServiceInput!) {
  createService(input: $input) {
    status
    service {
      serviceName
      assignedTo
      assignedAt
      admin
      image
    }
  }
}
    `;
export const useCreateServiceMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<CreateServiceMutation, TError, CreateServiceMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<CreateServiceMutation, TError, CreateServiceMutationVariables, TContext>(
      ['createService'],
      (variables?: CreateServiceMutationVariables) => fetcher<CreateServiceMutation, CreateServiceMutationVariables>(client, CreateServiceDocument, variables, headers)(),
      options
    );
export const DeleteDepartmentDocument = `
    mutation deleteDepartment($deleteDepartmentId: String!) {
  deleteDepartment(id: $deleteDepartmentId)
}
    `;
export const useDeleteDepartmentMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<DeleteDepartmentMutation, TError, DeleteDepartmentMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<DeleteDepartmentMutation, TError, DeleteDepartmentMutationVariables, TContext>(
      ['deleteDepartment'],
      (variables?: DeleteDepartmentMutationVariables) => fetcher<DeleteDepartmentMutation, DeleteDepartmentMutationVariables>(client, DeleteDepartmentDocument, variables, headers)(),
      options
    );
export const DeleteServiceDocument = `
    mutation deleteService($deleteServiceId: String!) {
  deleteService(id: $deleteServiceId)
}
    `;
export const useDeleteServiceMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<DeleteServiceMutation, TError, DeleteServiceMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<DeleteServiceMutation, TError, DeleteServiceMutationVariables, TContext>(
      ['deleteService'],
      (variables?: DeleteServiceMutationVariables) => fetcher<DeleteServiceMutation, DeleteServiceMutationVariables>(client, DeleteServiceDocument, variables, headers)(),
      options
    );
export const GetCaregiverDocument = `
    query getCaregiver($getCaregiver: String!) {
  getCaregiver(id: $getCaregiver) {
    status
    user {
      _id
      id
      email
      name
      role
      updatedAt
      createdAt
    }
  }
}
    `;
export const useGetCaregiverQuery = <
      TData = GetCaregiverQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: GetCaregiverQueryVariables,
      options?: UseQueryOptions<GetCaregiverQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<GetCaregiverQuery, TError, TData>(
      ['getCaregiver', variables],
      fetcher<GetCaregiverQuery, GetCaregiverQueryVariables>(client, GetCaregiverDocument, variables, headers),
      options
    );
export const GetCaregiversDocument = `
    query getCaregivers {
  getCaregivers {
    user {
      _id
      id
      email
      name
      role
      updatedAt
      createdAt
    }
  }
}
    `;
export const useGetCaregiversQuery = <
      TData = GetCaregiversQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: GetCaregiversQueryVariables,
      options?: UseQueryOptions<GetCaregiversQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<GetCaregiversQuery, TError, TData>(
      variables === undefined ? ['getCaregivers'] : ['getCaregivers', variables],
      fetcher<GetCaregiversQuery, GetCaregiversQueryVariables>(client, GetCaregiversDocument, variables, headers),
      options
    );
export const GetDepartmentByAdminDocument = `
    query getDepartmentByAdmin($getDepartmentByAdmin: String!) {
  getDepartmentByAdmin(email: $getDepartmentByAdmin) {
    status
    department {
      departmentName
      admin
    }
  }
}
    `;
export const useGetDepartmentByAdminQuery = <
      TData = GetDepartmentByAdminQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: GetDepartmentByAdminQueryVariables,
      options?: UseQueryOptions<GetDepartmentByAdminQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<GetDepartmentByAdminQuery, TError, TData>(
      ['getDepartmentByAdmin', variables],
      fetcher<GetDepartmentByAdminQuery, GetDepartmentByAdminQueryVariables>(client, GetDepartmentByAdminDocument, variables, headers),
      options
    );
export const GetDepartmentsDocument = `
    query getDepartments($input: Departmentfilter!) {
  getDepartments(input: $input) {
    status
    results
    departments {
      _id
      departmentName
      admin
    }
  }
}
    `;
export const useGetDepartmentsQuery = <
      TData = GetDepartmentsQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: GetDepartmentsQueryVariables,
      options?: UseQueryOptions<GetDepartmentsQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<GetDepartmentsQuery, TError, TData>(
      ['getDepartments', variables],
      fetcher<GetDepartmentsQuery, GetDepartmentsQueryVariables>(client, GetDepartmentsDocument, variables, headers),
      options
    );
export const GetServicebyAdminDocument = `
    query getServicebyAdmin($getServicebyAdmin: String!) {
  getServicebyAdmin(email: $getServicebyAdmin) {
    status
    services {
      _id
      serviceName
      assignedTo
      assignedAt
      admin
      trolleyOne {
        name
        expiryDate
        qty
      }
      trolleyTwo {
        name
        expiryDate
        qty
      }
      trolleyThree {
        name
        expiryDate
        qty
      }
      trolleyFour {
        name
        expiryDate
        qty
      }
      image
    }
  }
}
    `;
export const useGetServicebyAdminQuery = <
      TData = GetServicebyAdminQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: GetServicebyAdminQueryVariables,
      options?: UseQueryOptions<GetServicebyAdminQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<GetServicebyAdminQuery, TError, TData>(
      ['getServicebyAdmin', variables],
      fetcher<GetServicebyAdminQuery, GetServicebyAdminQueryVariables>(client, GetServicebyAdminDocument, variables, headers),
      options
    );
export const GetServiceDocument = `
    query getService($getServiceId: String!) {
  getService(id: $getServiceId) {
    status
    service {
      _id
      serviceName
      assignedTo
      assignedAt
      admin
      trolleyOne {
        name
        expiryDate
        qty
      }
      trolleyTwo {
        name
        expiryDate
        qty
      }
      trolleyThree {
        name
        expiryDate
        qty
      }
      trolleyFour {
        name
        expiryDate
        qty
      }
      image
    }
  }
}
    `;
export const useGetServiceQuery = <
      TData = GetServiceQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: GetServiceQueryVariables,
      options?: UseQueryOptions<GetServiceQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<GetServiceQuery, TError, TData>(
      ['getService', variables],
      fetcher<GetServiceQuery, GetServiceQueryVariables>(client, GetServiceDocument, variables, headers),
      options
    );
export const GetServicesDocument = `
    query getServices($input: ServiceFilter!) {
  getServices(input: $input) {
    status
    results
    services {
      _id
      serviceName
      assignedTo
      assignedAt
      admin
      trolleyOne {
        name
        expiryDate
        qty
      }
      trolleyTwo {
        name
        expiryDate
        qty
      }
      trolleyThree {
        name
        expiryDate
        qty
      }
      trolleyFour {
        name
        expiryDate
        qty
      }
    }
  }
}
    `;
export const useGetServicesQuery = <
      TData = GetServicesQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: GetServicesQueryVariables,
      options?: UseQueryOptions<GetServicesQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<GetServicesQuery, TError, TData>(
      ['getServices', variables],
      fetcher<GetServicesQuery, GetServicesQueryVariables>(client, GetServicesDocument, variables, headers),
      options
    );
export const UpdateServiceDocument = `
    mutation updateService($input: UpdateServiceInput!, $updateServiceId: String!) {
  updateService(input: $input, id: $updateServiceId) {
    status
    service {
      assignedAt
      admin
    }
  }
}
    `;
export const useUpdateServiceMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<UpdateServiceMutation, TError, UpdateServiceMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<UpdateServiceMutation, TError, UpdateServiceMutationVariables, TContext>(
      ['updateService'],
      (variables?: UpdateServiceMutationVariables) => fetcher<UpdateServiceMutation, UpdateServiceMutationVariables>(client, UpdateServiceDocument, variables, headers)(),
      options
    );