const defaultResponse = {
  response: {},
  error: '',
  status: 0,
};

export const signupApi = (state = defaultResponse, action) => {
  switch (action.type) {
    case 'SIGNUP_API_SUCCESS':
      return {
        ...state,
        response: action.payload,
        error: '',
        status: 1,
      };
    case 'SIGNUP_API_ERROR':
      return {
        ...state,
        response: {},
        error: action.payload,
        status: 1,
      };
    case 'RESET':
      return { ...defaultResponse };
    default:
      return state;
  }
};

export const signinApi = (state = defaultResponse, action) => {
  switch (action.type) {
    case 'SIGNIN_API_SUCCESS':
      return {
        ...state,
        response: action.payload,
        error: '',
        status: 1,
      };
    case 'SIGNIN_API_ERROR':
      return {
        ...state,
        response: {},
        error: action.payload,
        status: 1,
      };
    case 'SIGNIN_API_LOGOUT':
      return {
        ...defaultResponse,
      };
    case 'RESET':
      return { ...defaultResponse };
    default:
      return state;
  }
};

export const signoutApi = (state = defaultResponse, action) => {
  switch (action.type) {
    case 'SIGNOUT_API_SUCCESS':
      return {
        ...state,
        response: action.payload,
        error: '',
        status: 1,
      };
    case 'SIGNOUT_API_ERROR':
      return {
        ...state,
        response: {},
        error: action.payload,
        status: 1,
      };
    case 'RESET':
      return { ...defaultResponse };
    default:
      return state;
  }
};

export const getRestaurantInfoApi = (state = defaultResponse, action) => {
  switch (action.type) {
    case 'GET_RESTAURANT_INFO_API_SUCCESS':
      return {
        ...state,
        response: action.payload,
        error: '',
        status: 1,
      };
    case 'GET_RESTAURANT_INFO_API_ERROR':
      return {
        ...state,
        response: {},
        error: action.payload,
        status: 1,
      };
    case 'RESET':
      return { ...defaultResponse };
    default:
      return state;
  }
};

export const getDishesApi = (state = defaultResponse, action) => {
  switch (action.type) {
    case 'GET_DISHES_API_SUCCESS':
      return {
        ...state,
        response: action.payload,
        error: '',
        status: 1,
      };
    case 'GET_DISHES_API_ERROR':
      return {
        ...state,
        response: {},
        error: action.payload,
        status: 1,
      };
    case 'RESET':
      return { ...defaultResponse };
    default:
      return state;
  }
};

export const createDishApi = (state = defaultResponse, action) => {
  switch (action.type) {
    case 'CREATE_DISH_API_SUCCESS':
      return {
        ...state,
        response: action.payload,
        error: '',
        status: 1,
      };
    case 'CREATE_DISH_API_ERROR':
      return {
        ...state,
        response: {},
        error: action.payload,
        status: 1,
      };
    case 'RESET':
      return { ...defaultResponse };
    default:
      return state;
  }
};
export const updateDishApi = (state = defaultResponse, action) => {
  switch (action.type) {
    case 'UPDATE_DISH_API_SUCCESS':
      return {
        ...state,
        response: action.payload,
        error: '',
        status: 1,
      };
    case 'UPDATE_DISH_API_ERROR':
      return {
        ...state,
        response: {},
        error: action.payload,
        status: 1,
      };
    case 'RESET':
      return { ...defaultResponse };
    default:
      return state;
  }
};

export const updateRestaurantInfoApi = (state = defaultResponse, action) => {
  switch (action.type) {
    case 'UPDATE_RESTAURANT_INFO_API_SUCCESS':
      return {
        ...state,
        response: action.payload,
        error: '',
        status: 1,
      };
    case 'UPDATE_RESTAURANT_INFO_API_ERROR':
      return {
        ...state,
        response: {},
        error: action.payload,
        status: 1,
      };
    case 'RESET':
      return { ...defaultResponse };
    default:
      return state;
  }
};

export const getRestaurantOrdersApi = (state = defaultResponse, action) => {
  switch (action.type) {
    case 'GET_RESTAURANT_ORDERS_API_SUCCESS':
      return {
        ...state,
        response: action.payload,
        error: '',
        status: 1,
      };
    case 'GET_RESTAURANT_ORDERS_API_ERROR':
      return {
        ...state,
        response: {},
        error: action.payload,
        status: 1,
      };
    case 'RESET':
      return { ...defaultResponse };
    default:
      return state;
  }
};

export const updateOrderStatusApi = (state = defaultResponse, action) => {
  switch (action.type) {
    case 'UPDATE_ORDER_STATUS_API_SUCCESS':
      return {
        ...state,
        response: action.payload,
        error: '',
        status: 1,
      };
    case 'UPDATE_ORDER_STATUS_API_ERROR':
      return {
        ...state,
        response: {},
        error: action.payload,
        status: 1,
      };
    case 'RESET':
      return { ...defaultResponse };
    default:
      return state;
  }
};

export const deleteDishApi = (state = defaultResponse, action) => {
  switch (action.type) {
    case 'DELETE_DISH_API_SUCCESS':
      return {
        ...state,
        response: action.payload,
        error: '',
        status: 1,
      };
    case 'DELETE_DISH_API_ERROR':
      return {
        ...state,
        response: {},
        error: action.payload,
        status: 1,
      };
    case 'RESET':
      return { ...defaultResponse };
    default:
      return state;
  }
};

export const getRestaurantsListApi = (state = defaultResponse, action) => {
  switch (action.type) {
    case 'GET_RESTAURANTS_LIST_API_SUCCESS':
      return {
        ...state,
        response: action.payload,
        error: '',
        status: 1,
      };
    case 'GET_RESTAURANTS_LIST_API_ERROR':
      return {
        ...state,
        response: {},
        error: action.payload,
        status: 1,
      };
    case 'RESET':
      return { ...defaultResponse };
    default:
      return state;
  }
};

export const addToCartApi = (state = defaultResponse, action) => {
  switch (action.type) {
    case 'ADD_TO_CART_API_SUCCESS':
      return {
        ...state,
        response: action.payload,
        error: '',
        status: 1,
      };
    case 'ADD_TO_CART_API_ERROR':
      return {
        ...state,
        response: {},
        error: action.payload,
        status: 1,
      };
    case 'RESET':
      return { ...defaultResponse };
    default:
      return state;
  }
};

export const addNewToCartApi = (state = defaultResponse, action) => {
  switch (action.type) {
    case 'ADD_NEW_TO_CART_API_SUCCESS':
      return {
        ...state,
        response: action.payload,
        error: '',
        status: 1,
      };
    case 'ADD_NEW_TO_CART_API_ERROR':
      return {
        ...state,
        response: {},
        error: action.payload,
        status: 1,
      };
    case 'RESET':
      return { ...defaultResponse };
    default:
      return state;
  }
};

export const getCartApi = (state = defaultResponse, action) => {
  switch (action.type) {
    case 'GET_CART_API_SUCCESS':
      return {
        ...state,
        response: action.payload,
        error: '',
        status: 1,
      };
    case 'GET_CART_API_ERROR':
      return {
        ...state,
        response: {},
        error: action.payload,
        status: 1,
      };
    case 'RESET':
      return { ...defaultResponse };
    default:
      return state;
  }
};

export const getOrderDetailsApi = (state = defaultResponse, action) => {
  switch (action.type) {
    case 'GET_ORDER_DETAILS_API_SUCCESS':
      return {
        ...state,
        response: action.payload,
        error: '',
        status: 1,
      };
    case 'GET_ORDER_DETAILS_API_ERROR':
      return {
        ...state,
        response: {},
        error: action.payload,
        status: 1,
      };
    case 'RESET':
      return { ...defaultResponse };
    default:
      return state;
  }
};

export const placeOrderApi = (state = defaultResponse, action) => {
  switch (action.type) {
    case 'PLACE_ORDER_API_SUCCESS':
      return {
        ...state,
        response: action.payload,
        error: '',
        status: 1,
      };
    case 'PLACE_ORDER_API_ERROR':
      return {
        ...state,
        response: {},
        error: action.payload,
        status: 1,
      };
    case 'RESET':
      return { ...defaultResponse };
    default:
      return state;
  }
};

export const myOrdersApi = (state = defaultResponse, action) => {
  switch (action.type) {
    case 'MY_ORDERS_API_SUCCESS':
      return {
        ...state,
        response: action.payload,
        error: '',
        status: 1,
      };
    case 'MY_ORDERS_API_ERROR':
      return {
        ...state,
        response: {},
        error: action.payload,
        status: 1,
      };
    case 'RESET':
      return { ...defaultResponse };
    default:
      return state;
  }
};

export const getUserProfileApi = (state = defaultResponse, action) => {
  switch (action.type) {
    case 'GET_USER_PROFILE_API_SUCCESS':
      return {
        ...state,
        response: action.payload,
        error: '',
        status: 1,
      };
    case 'GET_USER_PROFILE_API_ERROR':
      return {
        ...state,
        response: {},
        error: action.payload,
        status: 1,
      };
    case 'RESET':
      return { ...defaultResponse };
    default:
      return state;
  }
};

export const updateUserInfoApi = (state = defaultResponse, action) => {
  switch (action.type) {
    case 'UPDATE_USER_INFO_API_SUCCESS':
      return {
        ...state,
        response: action.payload,
        error: '',
        status: 1,
      };
    case 'UPDATE_USER_INFO_API_ERROR':
      return {
        ...state,
        response: {},
        error: action.payload,
        status: 1,
      };
    case 'RESET':
      return { ...defaultResponse };
    default:
      return state;
  }
};

export const addToFavoritesApi = (state = defaultResponse, action) => {
  switch (action.type) {
    case 'ADD_TO_FAVORITES_API_SUCCESS':
      return {
        ...state,
        response: action.payload,
        error: '',
        status: 1,
      };
    case 'ADD_TO_FAVORITES_API_ERROR':
      return {
        ...state,
        response: {},
        error: action.payload,
        status: 1,
      };
    case 'RESET':
      return { ...defaultResponse };
    default:
      return state;
  }
};

export const removeFromFavoritesApi = (state = defaultResponse, action) => {
  switch (action.type) {
    case 'REMOVE_FROM_FAVORITES_API_SUCCESS':
      return {
        ...state,
        response: action.payload,
        error: '',
        status: 1,
      };
    case 'REMOVE_FROM_FAVORITES_API_ERROR':
      return {
        ...state,
        response: {},
        error: action.payload,
        status: 1,
      };
    case 'RESET':
      return { ...defaultResponse };
    default:
      return state;
  }
};

export const getFavoritesApi = (state = defaultResponse, action) => {
  switch (action.type) {
    case 'GET_FAVORITES_API_SUCCESS':
      return {
        ...state,
        response: action.payload,
        error: '',
        status: 1,
      };
    case 'GET_FAVORITES_API_ERROR':
      return {
        ...state,
        response: {},
        error: action.payload,
        status: 1,
      };
    case 'RESET':
      return { ...defaultResponse };
    default:
      return state;
  }
};

export const getAllAddressesApi = (state = defaultResponse, action) => {
  switch (action.type) {
    case 'GET_ALL_ADDRESSES_API_SUCCESS':
      return {
        ...state,
        response: action.payload,
        error: '',
        status: 1,
      };
    case 'GET_ALL_ADDRESSES_API_ERROR':
      return {
        ...state,
        response: {},
        error: action.payload,
        status: 1,
      };
    case 'RESET':
      return { ...defaultResponse };
    default:
      return state;
  }
};

export const getRestaurantDeliveryApi = (state = defaultResponse, action) => {
  switch (action.type) {
    case 'GET_RESTAURANT_DELIVERY_API_SUCCESS':
      return {
        ...state,
        response: action.payload,
        error: '',
        status: 1,
      };
    case 'GET_RESTAURANT_DELIVERY_API_ERROR':
      return {
        ...state,
        response: {},
        error: action.payload,
        status: 1,
      };
    case 'RESET':
      return { ...defaultResponse };
    default:
      return state;
  }
};

export const addNewAddressApi = (state = defaultResponse, action) => {
  switch (action.type) {
    case 'ADD_NEW_ADDRESS_API_SUCCESS':
      return {
        ...state,
        response: action.payload,
        error: '',
        status: 1,
      };
    case 'ADD_NEW_ADDRESS_API_ERROR':
      return {
        ...state,
        response: {},
        error: action.payload,
        status: 1,
      };
    case 'RESET':
      return { ...defaultResponse };
    default:
      return state;
  }
};

export const test = 1;
