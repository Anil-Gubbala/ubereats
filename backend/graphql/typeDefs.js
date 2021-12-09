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

  type Dish {
    category: Int
    description: String
    email: String
    ingredients: String
    name: String
    picture: String
    price: Float
    type: Int
  }

  type RestaurantOrder {
    address_id: Int
    date: String
    delivery: Int
    id: Int
    location: String
    status: Int
    user_id: String
  }

  type UserOrder {
    address_id: Int
    date: String
    delivery: Int
    id: Int
    location: String
    restaurant_id: String
    status: Int
  }

  type OrderDishDetails {
    count: Int
    dish: String
    price: Float
  }

  type Cart {
    count: Int
    dish: String
    price: Float
    restaurant_id: String
  }

  type RestaurantDelivery {
    delivery: Int
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
    getRestaurantInfo(id: String): RestaurantInfo
    getDishes(id: String, type: Int): [Dish]
    getRestaurantOrders(filter: Int): [RestaurantOrder]
    getOrderDetails(id: Int): [OrderDishDetails]
    getCart: [Cart]
    getRestaurantDelivery(email: String): [RestaurantDelivery]
    getAllAddresses: [UserAddress]
    myOrders(filter: Int, deliveryType: Int): [UserOrder]
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
    updateRestaurantInfo(
      name: String
      location: String
      contact: Int
      picture: String
      description: String
      start: String
      end: String
      latitude: Float
      longitude: Float
      delivery: Int
    ): Success
    createDish(
      name: String
      ingredients: String
      picture: String
      price: Float
      description: String
      category: Int
      type: Int
    ): Success
    updateOrderStatus(status: Int, order_id: Int): Success
    addToCart(
      restaurantId: String
      dish: String
      count: Int
      price: Float
    ): Success
    placeOrder(addressId: Int, delivery: Int, restaurantId: String): Success
  }
`;

module.exports = typeDefs;
