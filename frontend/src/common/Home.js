import React from 'react';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import CustomerHome from '../customer/CustomerHome';
import RestaurantHome from '../restaurant/RestaurantHome';
import CONSTANTS from '../utils/consts';
import Profile from '../customer/Profile';

function Home() {
  const isLoggedIn = localStorage.getItem(CONSTANTS.STR_KEY);
  const status = localStorage.getItem(CONSTANTS.STATUS);

  console.log(status);
  if (isLoggedIn === CONSTANTS.STR_USER) {
    if (status === '0') {
      return <Profile></Profile>;
    }
    return <CustomerHome></CustomerHome>;
  }
  if (isLoggedIn === CONSTANTS.STR_RESTAURANT) {
    return <RestaurantHome></RestaurantHome>;
  }
  return <Redirect to='/signin'></Redirect>;
}

export default Home;
