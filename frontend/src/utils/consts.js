const CONSTANTS = {
  COOKIE: 'ubereats273',
  COOKIE_KEY: { ISCUSTOMER: 'customer', EMAIL: 'email' },
  // SERVERURL: 'http://3.142.131.218:4000',
  SERVERURL: 'http://localhost:4000',
  STR_KEY: 'ubereats',
  STR_USER: '1',
  STR_RESTAURANT: '2',
  STATUS: 'uberstatus',
};

export const DELIVERY_STATUS = {
  0: 'Order recieved',
  1: 'Preparing Food',
  2: 'On the way',
  3: 'Delivered',
  4: 'Cancelled',
};

export const PICKUP_STATUS = {
  0: 'Order recieved',
  1: 'Preparing Food',
  2: 'Ready for pickup',
  3: 'Picked up',
  4: 'Cancelled',
};

export const LOG_REDUCER = {
  IS_CUSTOMER: 'isCustomer',
  IS_LOGGEDIN: 'isLoggedIn',
  EMAIL: 'email',
};

export const DISH_CATEGORY = {
  0: 'Appetizer',
  1: 'Salad',
  2: 'Main Course',
  3: 'Desert',
  4: 'Beverage',
};

export const REST_ORDER_FILTER = {
  0: 'New Orders',
  3: 'Delivered Orders',
  4: 'Cancelled Orders',
};

export const REST_DELIVERY_MODE = {
  0: 'Delivery & Pickup',
  1: 'Pickup',
};

export const VEG = {
  0: 'Non-Veg',
  1: 'Veg',
  2: 'Vegan',
};

export const ORDER_DELIVERY_MODE = {
  0: 'Delivery',
  1: 'Pickup',
};

export default CONSTANTS;
