import { gql } from "graphql-tag";

export const ADD_TASK = gql`
  mutation Mutation($newTaskData: NewTaskInput!) {
    addTask(newTaskData: $newTaskData)
  }
`;
