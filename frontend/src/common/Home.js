import React from 'react';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import CustomerHome from '../customer/CustomerHome';
import RestaurantHome from '../restaurant/RestaurantHome';
import CONSTANTS from '../utils/consts';

function Home() {
  const isLoggedIn = localStorage.getItem(CONSTANTS.STR_KEY);

  console.log(CONSTANTS.STR_KEY, isLoggedIn);

  if (isLoggedIn === CONSTANTS.STR_USER) {
    return <CustomerHome></CustomerHome>;
  }
  if (isLoggedIn === CONSTANTS.STR_RESTAURANT) {
    return <RestaurantHome></RestaurantHome>;
  }
  return <Redirect to='/signin'></Redirect>;
}

export default Home;
