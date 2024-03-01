import { gql } from "graphql-tag";

export const UPDATE_TASK = gql`
  mutation UpdateTask($updatedTaskData: UpdateTaskInput!, $updateTaskId: Int!) {
    updateTask(updatedTaskData: $updatedTaskData, id: $updateTaskId)
  }
`;
