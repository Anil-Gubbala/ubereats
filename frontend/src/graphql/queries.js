import { useQuery, useLazyQuery, gql, useMutation } from "@apollo/client";

export const signin = gql`
  query signin($email: ID!, $password: String!, $customer: Boolean) {
    signin(email: $email, password: $password, customer: $customer) {
      token
      email
      isCustomer
      status
    }
  }
`;

export const q2 = {};
