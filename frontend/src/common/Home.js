import React from 'react';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import CustomerHome from '../customer/CustomerHome';
import RestaurantHome from '../restaurant/RestaurantHome';
import { COOKIE } from '../utils/consts';

function Home() {
  const cookieData = cookie.load(COOKIE);
  if (cookieData === undefined) {
    return <Redirect to='/signin'></Redirect>;
  }
  if (cookieData === 'true') {
    return <CustomerHome></CustomerHome>;
  }

  return <RestaurantHome />;
}

export default Home;
