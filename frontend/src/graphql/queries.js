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

export const gqlGetDishes = gql`
  query GetDishes($id: String, $type: Int) {
    getDishes(id: $id, type: $type) {
      category
      description
      email
      ingredients
      name
      price
      picture
      type
    }
  }
`;

export const gqlGetRestaurantOrders = gql`
  query Query($filter: Int) {
    getRestaurantOrders(filter: $filter) {
      address_id
      date
      delivery
      id
      location
      status
      user_id
    }
  }
`;

export const gqlGetOrderDetails = gql`
  query Query($id: Int) {
    getOrderDetails(id: $id) {
      count
      dish
      price
    }
  }
`;

export const gqlGetCart = gql`
  query Query {
    getCart {
      count
      dish
      price
      restaurant_id
    }
  }
`;

export const gqlGetRestaurantDelivery = gql`
  query GetRestaurantDelivery($email: String) {
    getRestaurantDelivery(email: $email) {
      delivery
    }
  }
`;

export const gqlGetAllAddresses = gql`
  query Query {
    getAllAddresses {
      active
      country
      id
      latitude
      location
      longitude
    }
  }
`;

export const gqlMyOrders = gql`
  query MyOrders($filter: Int, $deliveryType: Int) {
    myOrders(filter: $filter, deliveryType: $deliveryType) {
      address_id
      date
      delivery
      id
      location
      restaurant_id
      status
    }
  }
`;

export const gqlGetRestaurantInfo = gql`
  query GetRestaurantInfo($id: String) {
    getRestaurantInfo(id: $id) {
      contact
      delivery
      description
      email
      end
      location
      latitude
      longitude
      name
      picture
      start
      status
    }
  }
`;

export const gqlPlaceOrder = gql`
  mutation PlaceOrder($addressId: Int, $delivery: Int, $restaurantId: String) {
    placeOrder(
      addressId: $addressId
      delivery: $delivery
      restaurantId: $restaurantId
    ) {
      success
    }
  }
`;

export const gqlAddToCart = gql`
  mutation AddToCart(
    $restaurantId: String
    $dish: String
    $count: Int
    $price: Float
  ) {
    addToCart(
      restaurantId: $restaurantId
      dish: $dish
      count: $count
      price: $price
    ) {
      success
    }
  }
`;

export const gqlUpdateOrderStatus = gql`
  mutation UpdateOrderStatus($order_id: Int, $status: Int) {
    updateOrderStatus(order_id: $order_id, status: $status) {
      success
    }
  }
`;

export const gqlUpdateUserProfile = gql`
  mutation UpdateUserInfo(
    $contact: Float
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

export const gqlUpdateRestaurantInfo = gql`
  mutation UpdateRestaurantInfo(
    $name: String
    $location: String
    $contact: Float
    $picture: String
    $description: String
    $start: String
    $end: String
    $latitude: Float
    $longitude: Float
    $delivery: Int
  ) {
    updateRestaurantInfo(
      name: $name
      location: $location
      contact: $contact
      picture: $picture
      description: $description
      start: $start
      end: $end
      latitude: $latitude
      longitude: $longitude
      delivery: $delivery
    ) {
      success
    }
  }
`;

export const gqlCreateDish = gql`
  mutation CreateDish(
    $name: String
    $ingredients: String
    $picture: String
    $price: Float
    $description: String
    $category: Int
    $type: Int
  ) {
    createDish(
      name: $name
      ingredients: $ingredients
      picture: $picture
      price: $price
      description: $description
      category: $category
      type: $type
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
