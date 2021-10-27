import React from 'react';
import { render, screen } from '@testing-library/react';

import '@testing-library/jest-dom/extend-expect';
import MyOrders from '../customer/MyOrders';
import PlaceOrder from '../customer/PlaceOrder';
import RestaurantHome from '../restaurant/RestaurantHome';
import Dishes from '../restaurant/Dishes';
import CustomerHome from '../customer/CustomerHome';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

describe('MyOrders', () => {
  test('renders MyOrders component', () => {
    render(<MyOrders />);

    expect(screen.getByText('order ID')).toBeInTheDocument();
    expect(screen.getByText('Select Delivery Type')).toBeInTheDocument();
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
