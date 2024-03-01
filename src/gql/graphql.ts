/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
};

export type ErrorType = {
  __typename?: "ErrorType";
  code?: Maybe<Scalars["String"]["output"]>;
  message: Scalars["String"]["output"];
};

export type ForgotPasswordInput = {
  email: Scalars["String"]["input"];
};

export type GqlStatus = {
  __typename?: "GQLStatus";
  backgroundColor: Scalars["String"]["output"];
  id: Scalars["String"]["output"];
  statusName: Scalars["String"]["output"];
  textColor: Scalars["String"]["output"];
};

export type GqlTask = {
  __typename?: "GQLTask";
  assignUser?: Maybe<User>;
  id: Scalars["Int"]["output"];
  status?: Maybe<GqlStatus>;
  taskDescription?: Maybe<Scalars["String"]["output"]>;
  taskTitle: Scalars["String"]["output"];
};

export type LoginInput = {
  email: Scalars["String"]["input"];
  password: Scalars["String"]["input"];
};

export type MutationAddTaskArgs = {
  newTaskData: NewTaskInput;
};

export type MutationForgotPasswordArgs = {
  emailInput: ForgotPasswordInput;
};

export type MutationRemoveTaskArgs = {
  id: Scalars["Int"]["input"];
};

export type MutationRemoveUserArgs = {
  id: Scalars["String"]["input"];
};

export type NewTaskInput = {
  assignUserId?: InputMaybe<Scalars["Int"]["input"]>;
  description?: InputMaybe<Scalars["String"]["input"]>;
  statusId: Scalars["String"]["input"];
  title: Scalars["String"]["input"];
};

export type QueryGetUserArgs = {
  id: Scalars["String"]["input"];
};

export type QueryTasksArgs = {
  statusId?: InputMaybe<Scalars["String"]["input"]>;
  title?: InputMaybe<Scalars["String"]["input"]>;
  userId?: InputMaybe<Scalars["Int"]["input"]>;
};

export type RegisterResponse = {
  __typename?: "RegisterResponse";
  error?: Maybe<ErrorType>;
  token?: Maybe<Token>;
  user?: Maybe<User>;
};

export type Token = {
  __typename?: "Token";
  expiration: Scalars["Float"]["output"];
  token: Scalars["String"]["output"];
  type: Scalars["String"]["output"];
};

export type UpdatePasswordInput = {
  password: Scalars["String"]["input"];
  token: Scalars["String"]["input"];
};

export type User = {
  __typename?: "User";
  avatar?: Maybe<Scalars["String"]["output"]>;
  createdAt?: Maybe<Scalars["String"]["output"]>;
  email: Scalars["String"]["output"];
  fullname: Scalars["String"]["output"];
  hasChangePassword?: Maybe<Scalars["Boolean"]["output"]>;
  id: Scalars["ID"]["output"];
  isDeleted?: Maybe<Scalars["Boolean"]["output"]>;
  password: Scalars["String"]["output"];
  refreshToken?: Maybe<Scalars["String"]["output"]>;
  tasks: Array<GqlTask>;
  updatedAt?: Maybe<Scalars["String"]["output"]>;
};

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars["String"]["input"];
}>;

export type LoginUserMutation = {
  __typename?: "Mutation";
  login: {
    __typename?: "LoginResponse";
    user: { __typename?: "User"; id: string; fullname: string; email: string; avatar?: string | null };
    token: { __typename?: "Token"; expiration: number; token: string; type: string };
    error?: { __typename?: "ErrorType"; code?: string | null; message: string } | null;
  };
};

export type RegisterUserMutationVariables = Exact<{
  fullname: Scalars["String"]["input"];
  email: Scalars["String"]["input"];
  password: Scalars["String"]["input"];
}>;

export type RegisterUserMutation = {
  __typename?: "Mutation";
  register: {
    __typename?: "RegisterResponse";
    user?: { __typename?: "User"; id: string; fullname: string; email: string; avatar?: string | null } | null;
    error?: { __typename?: "ErrorType"; code?: string | null; message: string } | null;
  };
};

export type UpdatePasswordMutationVariables = Exact<{
  password: Scalars["String"]["input"];
  token: Scalars["String"]["input"];
}>;

export type UpdatePasswordMutation = {
  __typename?: "Mutation";
  updatePassword?: {
    __typename?: "SuccessReponse";
    success: boolean;
    message: string;
    error?: { __typename?: "ErrorType"; code?: string | null; message: string } | null;
  } | null;
};

export type GetAllStatusQueryVariables = Exact<{ [key: string]: never }>;

export type GetAllStatusQuery = {
  __typename?: "Query";
  statusList: Array<{
    __typename?: "GQLStatus";
    id: string;
    statusName: string;
    backgroundColor: string;
    textColor: string;
  }>;
};

export type GetAllTasksQueryVariables = Exact<{
  statusId?: InputMaybe<Scalars["String"]["input"]>;
  title?: InputMaybe<Scalars["String"]["input"]>;
  userId?: InputMaybe<Scalars["Int"]["input"]>;
}>;

export type GetAllTasksQuery = {
  __typename?: "Query";
  tasks: Array<{
    __typename?: "GQLTask";
    id: number;
    taskTitle: string;
    taskDescription?: string | null;
    status?: { __typename?: "GQLStatus"; id: string; statusName: string } | null;
    assignUser?: { __typename?: "User"; id: string; fullname: string; email: string; avatar?: string | null } | null;
  }>;
};

export const ForgotPasswordDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "ForgotPassword" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "email" } },
          type: { kind: "NonNullType", type: { kind: "NamedType", name: { kind: "Name", value: "String" } } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "forgotPassword" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "emailInput" },
                value: {
                  kind: "ObjectValue",
                  fields: [
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "email" },
                      value: { kind: "Variable", name: { kind: "Name", value: "email" } },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "error" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "code" } },
                      { kind: "Field", name: { kind: "Name", value: "message" } },
                    ],
                  },
                },
                { kind: "Field", name: { kind: "Name", value: "success" } },
                { kind: "Field", name: { kind: "Name", value: "message" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ForgotPasswordMutation, ForgotPasswordMutationVariables>;
export const LoginUserDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "LoginUser" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "email" } },
          type: { kind: "NonNullType", type: { kind: "NamedType", name: { kind: "Name", value: "String" } } },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "password" } },
          type: { kind: "NonNullType", type: { kind: "NamedType", name: { kind: "Name", value: "String" } } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "login" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "loginInput" },
                value: {
                  kind: "ObjectValue",
                  fields: [
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "email" },
                      value: { kind: "Variable", name: { kind: "Name", value: "email" } },
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "password" },
                      value: { kind: "Variable", name: { kind: "Name", value: "password" } },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "user" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "fullname" } },
                      { kind: "Field", name: { kind: "Name", value: "email" } },
                      { kind: "Field", name: { kind: "Name", value: "avatar" } },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "token" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "expiration" } },
                      { kind: "Field", name: { kind: "Name", value: "token" } },
                      { kind: "Field", name: { kind: "Name", value: "type" } },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "error" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "code" } },
                      { kind: "Field", name: { kind: "Name", value: "message" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<LoginUserMutation, LoginUserMutationVariables>;
export const RegisterUserDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "RegisterUser" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "fullname" } },
          type: { kind: "NonNullType", type: { kind: "NamedType", name: { kind: "Name", value: "String" } } },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "email" } },
          type: { kind: "NonNullType", type: { kind: "NamedType", name: { kind: "Name", value: "String" } } },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "password" } },
          type: { kind: "NonNullType", type: { kind: "NamedType", name: { kind: "Name", value: "String" } } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "register" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "registerInput" },
                value: {
                  kind: "ObjectValue",
                  fields: [
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "fullname" },
                      value: { kind: "Variable", name: { kind: "Name", value: "fullname" } },
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "email" },
                      value: { kind: "Variable", name: { kind: "Name", value: "email" } },
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "password" },
                      value: { kind: "Variable", name: { kind: "Name", value: "password" } },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "user" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "fullname" } },
                      { kind: "Field", name: { kind: "Name", value: "email" } },
                      { kind: "Field", name: { kind: "Name", value: "avatar" } },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "error" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "code" } },
                      { kind: "Field", name: { kind: "Name", value: "message" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<RegisterUserMutation, RegisterUserMutationVariables>;
export const UpdatePasswordDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "UpdatePassword" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "password" } },
          type: { kind: "NonNullType", type: { kind: "NamedType", name: { kind: "Name", value: "String" } } },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "token" } },
          type: { kind: "NonNullType", type: { kind: "NamedType", name: { kind: "Name", value: "String" } } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "updatePassword" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "passwordInput" },
                value: {
                  kind: "ObjectValue",
                  fields: [
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "password" },
                      value: { kind: "Variable", name: { kind: "Name", value: "password" } },
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "token" },
                      value: { kind: "Variable", name: { kind: "Name", value: "token" } },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "error" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "code" } },
                      { kind: "Field", name: { kind: "Name", value: "message" } },
                    ],
                  },
                },
                { kind: "Field", name: { kind: "Name", value: "success" } },
                { kind: "Field", name: { kind: "Name", value: "message" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UpdatePasswordMutation, UpdatePasswordMutationVariables>;
export const GetAllStatusDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "getAllStatus" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "statusList" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "statusName" } },
                { kind: "Field", name: { kind: "Name", value: "backgroundColor" } },
                { kind: "Field", name: { kind: "Name", value: "textColor" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetAllStatusQuery, GetAllStatusQueryVariables>;
export const GetAllTasksDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "getAllTasks" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "statusId" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "title" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "userId" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "tasks" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "statusId" },
                value: { kind: "Variable", name: { kind: "Name", value: "statusId" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "title" },
                value: { kind: "Variable", name: { kind: "Name", value: "title" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "userId" },
                value: { kind: "Variable", name: { kind: "Name", value: "userId" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "taskTitle" } },
                { kind: "Field", name: { kind: "Name", value: "taskDescription" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "status" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "statusName" } },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "assignUser" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "fullname" } },
                      { kind: "Field", name: { kind: "Name", value: "email" } },
                      { kind: "Field", name: { kind: "Name", value: "avatar" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetAllTasksQuery, GetAllTasksQueryVariables>;
/** All built-in and custom scalars, mapped to their actual values */

export type LoginResponse = {
  __typename?: "LoginResponse";
  error?: Maybe<ErrorType>;
  token: Token;
  user: User;
};

export type Mutation = {
  __typename?: "Mutation";
  addTask: Scalars["Int"]["output"];
  forgotPassword?: Maybe<SuccessReponse>;
  login: LoginResponse;
  register: RegisterResponse;
  removeTask: Scalars["Boolean"]["output"];
  removeUser?: Maybe<SuccessReponse>;
  updatePassword?: Maybe<SuccessReponse>;
};

export type MutationLoginArgs = {
  loginInput: LoginInput;
};

export type MutationRegisterArgs = {
  registerInput: RegisterInput;
};

export type MutationUpdatePasswordArgs = {
  passwordInput: UpdatePasswordInput;
};

export type Query = {
  __typename?: "Query";
  getAllUsers: Array<User>;
  getUser: User;
  profile: User;
  statusList: Array<GqlStatus>;
  task: GqlTask;
  tasks: Array<GqlTask>;
};

export type QueryTaskArgs = {
  id: Scalars["Int"]["input"];
};

export type RegisterInput = {
  email: Scalars["String"]["input"];
  fullname: Scalars["String"]["input"];
  password: Scalars["String"]["input"];
};

export type SuccessReponse = {
  __typename?: "SuccessReponse";
  error?: Maybe<ErrorType>;
  message: Scalars["String"]["output"];
  success: Scalars["Boolean"]["output"];
};

export type ForgotPasswordMutation = {
  __typename?: "Mutation";
  forgotPassword?: {
    __typename?: "SuccessReponse";
    success: boolean;
    message: string;
    error?: { __typename?: "ErrorType"; code?: string | null; message: string } | null;
  } | null;
};

export type LoginUserMutationVariables = Exact<{
  email: Scalars["String"]["input"];
  password: Scalars["String"]["input"];
}>;
