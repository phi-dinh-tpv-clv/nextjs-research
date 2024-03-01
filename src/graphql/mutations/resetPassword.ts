import { gql } from "graphql-tag";

export const UPDATE_PASSWORD = gql`
  mutation UpdatePassword($password: String!, $token: String!) {
    updatePassword(passwordInput: { password: $password, token: $token }) {
      error {
        code
        message
      }
      success
      message
    }
  }
`;
