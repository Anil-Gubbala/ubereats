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
import Button from 'react-bootstrap/Button';

import cookie from 'react-cookies';

import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import CONSTANTS from '../utils/consts';
import { actionCreators } from '../reducers/actionCreators';
import { get } from '../utils/serverCall';

function Navigator() {
  const currentState = useSelector((state) => state.loggedReducer);
  const cartState = useSelector((state) => state.cartReducer);
  const cookieData = cookie.load(CONSTANTS.COOKIE);
  const [cartFlag, setCartFlag] = useState(false);
  const dispatch = useDispatch();
  const { updateCart, customer, restaurant, signout } = bindActionCreators(
    actionCreators,
    dispatch
  );

  // const [login, setLogin] = useState(currentState);
  if (!cookieData) {
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
        }
      })
      .catch(() => {});
  };

  useEffect(() => {
    if (!cookieData) {
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
    if (localStorage.getItem(CONSTANTS.STR_KEY)) {
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
                {(!cookieData || !currentState.isLoggedIn) && (
                  // <Nav.Link href='signup'>Signup</Nav.Link>
                  <Link to='/signup' className='nav-link'>
                    Sign up
                  </Link>
                )}
                {(!cookieData || !currentState.isLoggedIn) && (
                  // <Nav.Link href='signin'>Singin</Nav.Link>
                  <Link to='/signin' className='nav-link'>
                    Sign in
                  </Link>
                )}
                {cookieData && currentState.isLoggedIn && (
                  // <Nav.Link href='signout'>Signout</Nav.Link>
                  <Link to='/signout' className='nav-link'>
                    Sign out
                  </Link>
                )}
                <IconButton aria-label='cart' onClick={openCartDialog}>
                  <StyledBadge badgeContent={0} color='primary'>
                    <ShoppingCartIcon />
                  </StyledBadge>
                </IconButton>
                {/* {<Nav.Link href='signup'>Signup</Nav.Link>}
                {<Nav.Link href='signin'>Signin</Nav.Link>}
                {<Nav.Link href='signout'>Logout</Nav.Link>} */}
                {/* {logged === 0 && <Nav.Link href='signup'>Signup</Nav.Link>}
                {logged === 0 && <Nav.Link href='signin'>Signin</Nav.Link>}
                {logged !== 0 && <Nav.Link href='signout'>Logout</Nav.Link>} */}
              </Nav>
            </Container>
          </Navbar>
        </Row>
        <Modal show={show} onHide={handleClose} animation={false}>
          <Modal.Header closeButton>
            <Modal.Title>{cartState.restaurantId}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Col>
              {Object.keys(cartState.dishes).map((key) => (
                <Row key={key}>
                  <Col>{key}</Col>
                  <Col>
                    <button>-</button>
                  </Col>
                  <Col>{cartState.dishes[key][0]} </Col>
                  <Col>
                    <button>+</button>
                  </Col>
                  <Col> {`$${cartState.dishes[key][1]}`}</Col>
                </Row>
              ))}
            </Col>
          </Modal.Body>
          <Modal.Footer>
            {/* <Button variant='secondary' onClick={handleClose}>
              Close
            </Button> */}
            {/* <Button variant='primary' onClick={handleClose}>
              Check out
            </Button> */}
            <Link to='/placeorder' className='nav-link' onClick={handleClose}>
              Check out
            </Link>
          </Modal.Footer>
        </Modal>
      </Container>
    </div>
  );
}

export default Navigator;
