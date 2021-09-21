import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './common/Home';
import Invalid from './common/Invalid';
import Signup from './common/Signup';
import Signin from './common/Signin';
import RestaurantHome from './restaurant/RestaurantHome';
import RestaurantOrders from './restaurant/RestaurantOrders';
import CustomerHome from './customer/CustomerHome';
import MyOrders from './customer/MyOrders';
import PlaceOrder from './customer/PlaceOrder';
import Profile from './customer/Profile';

function App() {
  return (
    <div className='App'>
      <Router>
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
          <Route path='/restaurantHome' exact>
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
