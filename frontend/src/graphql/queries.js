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

export const getUserProfile = gql`
  query Query($email: ID) {
    getUserProfile(email: $email) {
      user {
        name
        email
        status
      }
      profile {
        nickname
        dob
        contact
        about
        picture
      }
      addresses {
        active
        country
        id
        latitude
        location
        longitude
      }
    }
  }
`;

export const gqlGetRestaruantsList = gql`
  query GetRestaruantsList(
    $delivery: Int
    $search: String
    $favorite: Int
    $vegType: Int
  ) {
    getRestaruantsList(
      delivery: $delivery
      search: $search
      favorite: $favorite
      vegType: $vegType
    ) {
      contact
      delivery
      description
      email
      end
      latitude
      location
      longitude
      name
      picture
      status
      start
    }
  }
`;

export const gqlUpdateUserProfile = gql`
  mutation UpdateUserInfo(
    $contact: Int
    $email: String
    $name: String
    $location: String
    $dob: String
    $nickname: String
    $picture: String
    $about: String
    $country: String
    $longitude: Float
    $latitude: Float
  ) {
    updateUserInfo(
      contact: $contact
      email: $email
      name: $name
      location: $location
      dob: $dob
      nickname: $nickname
      picture: $picture
      about: $about
      country: $country
      longitude: $longitude
      latitude: $latitude
    ) {
      success
    }
  }
`;

export const gqlSignup = gql`
  mutation Mutation(
    $name: String!
    $email: String!
    $accountType: String!
    $password: String!
    $restaurantName: String
    $location: String
    $latitude: Float
    $longitude: Float
  ) {
    signup(
      name: $name
      email: $email
      accountType: $accountType
      password: $password
      restaurantName: $restaurantName
      location: $location
      latitude: $latitude
      longitude: $longitude
    ) {
      success
    }
  }
`;
