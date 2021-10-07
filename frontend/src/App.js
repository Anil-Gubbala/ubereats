import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import cookie from 'react-cookies';
import Home from './common/Home';
import Invalid from './common/Invalid';
import Signup from './account/Signup';
import Signin from './account/Signin';
import RestaurantHome from './restaurant/RestaurantHome';
import RestaurantOrders from './restaurant/RestaurantOrders';
import CustomerHome from './customer/CustomerHome';
import MyOrders from './customer/MyOrders';
import PlaceOrder from './customer/PlaceOrder';
import Profile from './customer/Profile';
import Navigator from './common/Navigator';
import Signout from './account/Signout';
import { Redirect } from 'react-router';
import { useSelector } from 'react-redux';

import CONSTANTS from './utils/consts';

function App() {
  const isLoggedIn = localStorage.getItem(CONSTANTS.STR_KEY);
  const appCookies = cookie.load(CONSTANTS.COOKIE);
  const isCustomer = appCookies && appCookies.customer;
  const redirectSignin = <Redirect to='/signin' />;
  const redirectInvalid = <Redirect to='/invalid' />;
  const currentState = useSelector((state) => state.loggedReducer);
  const redirectCustomer = isCustomer ? redirectInvalid : redirectSignin; //redirect customer if access restaurant urls
  const redirectRestaurant = isCustomer ? redirectInvalid : redirectSignin;

  const authCheck = (restaurantPage, comp) => {
    const isLoggedIn = localStorage.getItem(CONSTANTS.STR_KEY);
    const appCookies = cookie.load(CONSTANTS.COOKIE);
    const isCustomer = appCookies && appCookies.customer;
    if (!isLoggedIn) {
      return redirectSignin;
    }
    if ((restaurantPage && isCustomer) || (!restaurantPage && !isCustomer)) {
      return redirectInvalid;
    }
    return comp;
  };

  console.log(isLoggedIn);

  return (
    <div className='App'>
      <Router>
        <Navigator />
        <Switch>
          <Route path='/signup' exact>
            <Signup />
          </Route>
          <Route path='/signin' exact>
            <Signin> </Signin>
          </Route>
          <Route path='/' exact>
            <Home />
          </Route>
          <Route path='/home' exact>
            <Home />
          </Route>
          <Route path='/restaurant' exact>
            {isLoggedIn ? <RestaurantHome /> : redirectSignin}
          </Route>
          <Route path='/restaurantOrders' exact>
            {authCheck(true, <RestaurantOrders />)}
          </Route>
          <Route path='/customerHome' exact>
            {isLoggedIn ? <CustomerHome /> : redirectSignin}
          </Route>
          <Route path='/myOrders' exact>
            {isLoggedIn ? <MyOrders /> : redirectSignin}
          </Route>
          <Route path='/profile' exact>
            {isLoggedIn ? <Profile /> : redirectSignin}
          </Route>
          <Route path='/placeOrder' exact>
            {isLoggedIn ? <PlaceOrder /> : redirectSignin}
          </Route>
          <Route path='/signout' exact>
            {isLoggedIn ? <Signout /> : redirectSignin}
          </Route>
          <Route path='/invalid' exact>
            <Invalid> </Invalid>
          </Route>
          <Route path='*'>
            <Invalid> </Invalid>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

App.propTypes = {};

export default App;
