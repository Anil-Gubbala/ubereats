import React from 'react';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import CustomerHome from '../customer/CustomerHome';
import RestaurantHome from '../restaurant/RestaurantHome';
import CONSTANTS from '../utils/consts';
import Profile from '../customer/Profile';

function Home() {
  const isLoggedIn = localStorage.getItem(CONSTANTS.TOKEN);
  const isCustomer = JSON.parse(localStorage.getItem(CONSTANTS.IS_CUSTOMER));
  const status = localStorage.getItem(CONSTANTS.STATUS);

  if (!isLoggedIn) {
    return <Redirect to="/signin"></Redirect>;
  }
  if (isCustomer) {
    if (status === '0') {
      return <Profile></Profile>;
    }
    return <CustomerHome></CustomerHome>;
  }
  if (!isCustomer) {
    return <RestaurantHome></RestaurantHome>;
  }
}

export default Home;
