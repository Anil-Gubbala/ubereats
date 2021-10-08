import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';

import Modal from 'react-bootstrap/Modal';

import cookie from 'react-cookies';

import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import CONSTANTS, { LOG_REDUCER } from '../utils/consts';
import { actionCreators } from '../reducers/actionCreators';
import { get } from '../utils/serverCall';

function Navigator() {
  const appCookies = cookie.load(CONSTANTS.COOKIE);

  const currentState = useSelector((state) => state.loggedReducer);
  const cartState = useSelector((state) => state.cartReducer);

  const isSignedOut = !appCookies || !currentState[LOG_REDUCER.IS_LOGGEDIN];
  const isCustomerLogin =
    appCookies &&
    currentState[LOG_REDUCER.IS_LOGGEDIN] &&
    currentState[LOG_REDUCER.IS_CUSTOMER];
  const isRestaurantLogin =
    appCookies &&
    currentState[LOG_REDUCER.IS_LOGGEDIN] &&
    !currentState[LOG_REDUCER.IS_CUSTOMER];

  const [cartFlag, setCartFlag] = useState(false);
  const dispatch = useDispatch();
  const { updateCart, customer, restaurant, signout } = bindActionCreators(
    actionCreators,
    dispatch
  );

  if (!appCookies) {
    localStorage.clear();
  }
  const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      right: -3,
      top: 13,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: '0 4px',
    },
  }));

  const getCart = (callback) => {
    get('/getCart')
      .then((response) => {
        if (response.length > 0) {
          const dishes = response.reduce(
            (obj, item) => ({
              ...obj,
              [item.dish]: [item.count, item.price],
            }),
            {}
          );
          updateCart({ restaurantId: response[0].restaurant_id, dishes });
          setCartFlag(true);
          if (callback) {
            callback();
          }
        } else {
          setCartFlag(true);
        }
      })
      .catch(() => {});
  };

  useEffect(() => {
    if (!appCookies) {
      localStorage.removeItem(CONSTANTS.STR_KEY);
    }
    if (localStorage.getItem(CONSTANTS.STR_KEY) === CONSTANTS.STR_USER) {
      customer();
      // getCart();
    } else if (
      localStorage.getItem(CONSTANTS.STR_KEY) === CONSTANTS.STR_RESTAURANT
    ) {
      // getCart();
      restaurant();
    } else {
      signout();
    }
  }, []);

  useEffect(() => {
    if (isCustomerLogin) {
      getCart();
    }
  }, [currentState]);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const openCartDialog = () => {
    if (!cartFlag) {
      getCart(handleShow);
    } else {
      handleShow();
    }
  };

  return (
    <div>
      <Container fluid>
        <Row>
          <Navbar bg='dark' variant='dark'>
            <Container>
              <Navbar.Brand>Uber Eats</Navbar.Brand>
              <Nav className='me-auto'>
                <Link to='/' className='nav-link'>
                  Home
                </Link>
              </Nav>
              <Nav>
                {isSignedOut && (
                  <Link to='/signup' className='nav-link'>
                    Sign up
                  </Link>
                )}
                {isSignedOut && (
                  <Link to='/signin' className='nav-link'>
                    Sign in
                  </Link>
                )}
                {!isSignedOut && (
                  <Link to='/signout' className='nav-link'>
                    Sign out
                  </Link>
                )}
                {!isSignedOut && isCustomerLogin && (
                  <Link to='/myOrders' className='nav-link'>
                    My Orders
                  </Link>
                )}
                {!isSignedOut && isCustomerLogin && (
                  <Link to='/profile' className='nav-link'>
                    Profile
                  </Link>
                )}
                {!isSignedOut && isRestaurantLogin && (
                  <Link to='/restaurantOrders' className='nav-link'>
                    Orders
                  </Link>
                )}
                {!isSignedOut && isCustomerLogin && (
                  <IconButton aria-label='cart' onClick={openCartDialog}>
                    <StyledBadge badgeContent={0} color='primary'>
                      <ShoppingCartIcon />
                    </StyledBadge>
                  </IconButton>
                )}
              </Nav>
            </Container>
          </Navbar>
        </Row>
        <Modal show={show} onHide={handleClose} animation={false}>
          <Modal.Header closeButton>
            <Modal.Title>{cartState.restaurantId}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {!cartState.restaurantId && <Col>No items in cart.</Col>}
            {cartState.restaurantId && (
              <Col>
                {Object.keys(cartState.dishes).map((key) => (
                  <Row key={key}>
                    <Col>{key}</Col>
                    {/* <Col>
                      <button>-</button>
                    </Col> */}
                    <Col>{cartState.dishes[key][0]} </Col>
                    {/* <Col>
                      <button>+</button>
                    </Col> */}
                    <Col> {`$${cartState.dishes[key][1]}`}</Col>
                  </Row>
                ))}
              </Col>
            )}
          </Modal.Body>
          <Modal.Footer>
            {cartState.restaurantId && (
              <Link to='/placeorder' className='nav-link' onClick={handleClose}>
                Check out
              </Link>
            )}
          </Modal.Footer>
        </Modal>
      </Container>
    </div>
  );
}

export default Navigator;
