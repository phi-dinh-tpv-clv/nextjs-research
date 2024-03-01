import { gql } from "graphql-tag";

export const GET_ALL_TASKS = gql`
  query getAllTasks($statusId: String, $title: String, $userId: Int) {
    tasks(statusId: $statusId, title: $title, userId: $userId) {
      id
      taskTitle
      taskDescription
      status {
        id
        statusName
        backgroundColor
        textColor
        persisted
      }
      assignUser {
        id
        fullname
        email
        avatar
      }
    }
  }
`;
