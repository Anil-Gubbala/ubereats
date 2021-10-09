const CONSTANTS = {
  COOKIE: 'ubereats273',
  COOKIE_KEY: { ISCUSTOMER: 'customer', EMAIL: 'email' },
  SERVERURL: 'http://localhost:4000',
  STR_KEY: 'ubereats',
  STR_USER: '1',
  STR_RESTAURANT: '2',
  STATUS: 'uberstatus',
};

export const ORDER_STATUS = {
  0: 'Order recieved',
  1: 'Preparing Food',
  2: 'On the way',
  3: 'Delivered',
  4: 'Ready for pickup',
  5: 'Picked up',
  6: 'Cancelled',
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
  0: 'All Orders',
  1: 'New Order',
  2: 'Delivered Orders',
  3: 'Cancelled Orders',
};

export const REST_DELIVERY_MODE = {
  0: 'Delivery',
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
