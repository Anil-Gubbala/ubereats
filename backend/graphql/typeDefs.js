const { gql } = require("apollo-server");

const typeDefs = gql`
  type User {
    email: String
    name: String
    status: Int
  }
  type UserProfile {
    about: String
    contact: Int
    dob: String
    nickname: String
    picture: String
  }
  type UserAddress {
    active: Int
    country: String
    id: Int
    latitude: Float
    location: String
    longitude: Float
  }

  type Token {
    token: String
    email: String
    isCustomer: Boolean
    status: Int
  }
  type Success {
    success: Boolean
  }
  input SignupIn {
    name: String!
    email: String!
    accountType: String!
    password: String!
  }

  type ProfileOut {
    user: User
    profile: UserProfile
    addresses: UserAddress
  }

  type RestaurantInfo {
    contact: Int
    delivery: Int
    description: String
    email: String
    end: String
    latitude: Float
    location: String
    longitude: Float
    name: String
    picture: String
    start: String
    status: Int
  }

  type Query {
    # user(id: ID!): User!
    signin(email: ID!, password: String!, customer: Boolean): Token
    # getUserProfile: [[User],[UserProfile],[UserAddress]]
    getUserProfile(email: ID): ProfileOut
    getRestaruantsList(
      delivery: Int
      vegType: Int
      favorite: Int
      search: String
    ): [RestaurantInfo]
  }

  type Mutation {
    signup(
      name: String!
      email: String!
      accountType: String!
      password: String!
      restaurantName: String
      location: String
      latitude: Float
      longitude: Float
    ): Success
    updateUserInfo(
      contact: Int
      email: String
      dob: String
      location: String
      name: String
      nickname: String
      picture: String
      about: String
      country: String
      latitude: Float
      longitude: Float
    ): Success
  }
`;

module.exports = typeDefs;
