import React from 'react';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import CustomerHome from '../customer/CustomerHome';
import RestaurantHome from '../restaurant/RestaurantHome';

function Home() {
  const isLoggedIn = localStorage.getItem('ubereats');
  if (isLoggedIn === null) {
    return <Redirect to='/signin'></Redirect>;
  }
  if (isLoggedIn === 1) {
    return <CustomerHome></CustomerHome>;
  }

  return <RestaurantHome />;
}

export default Home;
