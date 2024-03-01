import gql from "graphql-tag";

export const REGISTER_USER = gql`
  mutation RegisterUser($fullname: String!, $email: String!, $password: String!) {
    register(registerInput: { fullname: $fullname, email: $email, password: $password }) {
      user {
        id
        fullname
        email
        avatar
      }
      error {
        code
        message
      }
    }
  }
`;
