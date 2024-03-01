import { gql } from "graphql-tag";

export const GET_ALL_USERS = gql`
  query GetAllUsers($keyword: String!) {
    getAllUsers(keyword: $keyword) {
      id
      fullname
      email
      avatar
    }
  }
`;
