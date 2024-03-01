import { gql } from "graphql-tag";

export const FORGOT_PASSWORD = gql`
  mutation ForgotPassword($email: String!) {
    forgotPassword(emailInput: { email: $email }) {
      error {
        code
        message
      }
      success
      message
    }
  }
`;
