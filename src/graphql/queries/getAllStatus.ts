import { gql } from "graphql-tag";

export const GET_ALL_STATUS = gql`
  query getAllStatus {
    statusList {
      id
      statusName
      backgroundColor
      textColor
      persisted
    }
  }
`;
