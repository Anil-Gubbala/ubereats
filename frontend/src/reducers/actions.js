import { post } from '../utils/serverCall';

export const customer = (payload) => (dispatch) => {
  dispatch({ type: 'CUSTOMER', payload });
};

export const restaurant = (payload) => (dispatch) => {
  dispatch({ type: 'RESTAURANT', payload });
};

export const signout = () => (dispatch) => {
  dispatch({ type: 'SIGNOUT' });
};

export const signup = (payload) => (dispatch) => {
  dispatch({ type: 'SIGNUP', payload });
};

export const newRestWarning = (payload) => (dispatch) => {
  dispatch({ type: 'SHOW_WARNING', payload });
};

export const addItem = (payload) => (dispatch, getState) => {
  const cart = getState().cartReducer;
  const { restaurantId, dish, price } = payload;
  let { count } = payload;
  if (cart.restaurantId === '' || cart.restaurantId === restaurantId) {
    if (cart.restaurantId) {
      if (cart.dishes[dish]) {
        count = parseInt(cart.dishes[dish][0], 10) + 1;
      } else {
        count = 1;
      }
    } else {
      count = 1;
    }
    post('/addToCart', {
      restaurantId,
      dish,
      count,
      price,
    })
      .then(() => {
        cart.restaurantId = restaurantId;
        cart.dishes = { ...cart.dishes, [dish]: [count, price] };
        dispatch({ type: 'INSERT', payload: cart });
      })
      .catch((error) => {
        console.log(error);
      });
  } else {
    dispatch(newRestWarning({ ...payload, previousId: cart.restaurantId }));
    // alert('create new cart');payload
    // clear cart.
    // call same function again.
  }
};

export const updateCart = (payload) => (dispatch) => {
  dispatch({ type: 'INSERT', payload });
};

export const clearCart = () => (dispatch) => {
  dispatch({ type: 'CLEAR_CART' });
};

export const insertNewRest = (payload) => (dispatch) => {
  // dispatch(clearCart());
  // dispatch(addItem(payload));
  const { restaurantId, dish, price } = payload;
  const count = 1;
  post('/addNewToCart', {
    restaurantId,
    dish,
    count,
    price,
  })
    .then(() => {
      const dishes = { [dish]: [count, price] };
      dispatch({ type: 'INSERT', payload: { restaurantId, dishes } });
    })
    .catch((error) => {
      console.log(error);
    });
};

export const updateDeliveryMode = (payload) => (dispatch) => {
  dispatch({ type: 'DELIVERY', payload });
};

export const updateVegType = (payload) => (dispatch) => {
  dispatch({ type: 'VEG', payload });
};

export const updateFavoriteMode = (payload) => (dispatch) => {
  dispatch({ type: 'FAVORITE', payload });
};

export const clearHomeFilters = () => (dispatch) => {
  dispatch({ type: 'CLEAR_HOME_FILTERS' });
};

// export const cart = (payload) => (dispatch, getState) => {};
