const { gql } = require("apollo-server");

const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    password: String!
  }
  type Token {
    token: String
    email: String
    isCustomer: Boolean
    status: Int
  }
  type Query {
    user(id: ID!): User!
    signin(email: ID!, password: String!, customer: Boolean): Token
  }
  input CreateUserInput {
    name: String!
    username: String!
    age: Int!
  }
  type Mutation {
    createUser(input: CreateUserInput!): User
  }
`;

module.exports = typeDefs;
