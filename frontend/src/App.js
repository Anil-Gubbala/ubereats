import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
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

function App() {
  return (
    <div className='App'>
      <Router>
        <Navigator />
        <Switch>
          <Route path='/' exact>
            <Home />
          </Route>
          <Route path='/signup' exact>
            <Signup />
          </Route>
          <Route path='/signin' exact>
            <Signin> </Signin>
          </Route>
          <Route path='/home' exact>
            <Home></Home>
          </Route>
          <Route path='/restaurant' exact>
            <RestaurantHome />
          </Route>
          <Route path='/restaurantOrders' exact>
            <RestaurantOrders />
          </Route>
          <Route path='/customerHome' exact>
            <CustomerHome></CustomerHome>
          </Route>
          <Route path='/myOrders' exact>
            <MyOrders></MyOrders>
          </Route>
          <Route path='/profile' exact>
            <Profile></Profile>
          </Route>
          <Route path='/placeOrder' exact>
            <PlaceOrder></PlaceOrder>
          </Route>
          <Route path='/signout' exact>
            <Signout></Signout>
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
