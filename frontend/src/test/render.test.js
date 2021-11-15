import React from 'react';
import { render, screen } from '@testing-library/react';

import '@testing-library/jest-dom/extend-expect';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import MyOrders from '../customer/MyOrders';
import Profile from '../customer/Profile';
// import App from './App';

import PlaceOrder from '../customer/PlaceOrder';
import reducers from '../reducers/reducers';

// import { Provider } from 'react-redux';

// const ReduxProvider = ({ children, reduxStore }) => (
//   <Provider store={reduxStore}>{children}</Provider>
// );

const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)));

describe('MyOrders', () => {
  test('renders MyOrders component', () => {
    render(
      <Provider store={store}>
        <MyOrders />
        {/* <App /> */}
      </Provider>
    );
    expect(screen.getByText('order ID')).toBeInTheDocument();
    expect(screen.getByText('Restaurant')).toBeInTheDocument();
    expect(screen.getByText('Date')).toBeInTheDocument();
    expect(screen.getByText('Status')).toBeInTheDocument();
  });
});

describe('UserProfile', () => {
  test('renders user profile', () => {
    render(
      <Provider store={store}>
        <Profile />
        {/* <App /> */}
      </Provider>
    );
    expect(screen.getByText('Name:')).toBeInTheDocument();
    expect(screen.getByText('Nickname:')).toBeInTheDocument();
    expect(screen.getByText('Date Of Birth:')).toBeInTheDocument();
    expect(screen.getByText('Contact:')).toBeInTheDocument();
    expect(screen.getByText('Email:')).toBeInTheDocument();
    expect(screen.getByText('About:')).toBeInTheDocument();
  });
});

describe('Place Order', () => {
  test('renders place order page', () => {
    render(
      <Provider store={store}>
        <PlaceOrder />
        {/* <App /> */}
      </Provider>
    );
    expect(screen.getByText('Add New Address')).toBeInTheDocument();
    expect(screen.getByText('Bill Amount')).toBeInTheDocument();
    expect(screen.getByText('Add New Address')).toBeInTheDocument();
    expect(screen.getByText('Place Order')).toBeInTheDocument();
  });
});

// describe('MyOrders', () => {
//   test('renders MyOrders component', () => {
//     render(
//       <Provider>
//         <Router>
//           <CustomerHome />
//         </Router>
//       </Provider>
//     );
//     expect(screen.getByText('Update Restaurant Info')).toBeInTheDocument();
//   });
// });
