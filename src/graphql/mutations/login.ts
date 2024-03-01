import gql from "graphql-tag";

export const LOGIN_USER = gql`
  mutation LoginUser($email: String!, $password: String!) {
    login(loginInput: { email: $email, password: $password }) {
      user {
        id
        fullname
        email
        avatar
      }
      token {
        expiration
        token
        type
      }
      error {
        code
        message
      }
    }
  }
`;
