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

import CONSTANTS, {
  LOG_REDUCER,
  ORDER_DELIVERY_MODE,
  VEG,
} from '../utils/consts';
import { actionCreators } from '../reducers/actionCreators';
import { get } from '../utils/serverCall';
import { Form, Offcanvas } from 'react-bootstrap';
import Button from '@restart/ui/esm/Button';

function Navigator() {
  const appCookies = cookie.load(CONSTANTS.COOKIE);

  const currentState = useSelector((state) => state.loggedReducer);
  const cartState = useSelector((state) => state.cartReducer);
  const homeFilterState = useSelector((state) => state.homeFilterReducer);
  const newRestWarningState = useSelector((state) => state.newRestReducer);

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
  const defaultFilter = {
    vegType: 0,
    delivery: 0,
  };
  const [filter, setFilter] = useState(defaultFilter);
  const dispatch = useDispatch();
  const {
    updateCart,
    customer,
    restaurant,
    signout,
    updateDeliveryMode,
    updateVegType,
    insertNewRest,
  } = bindActionCreators(actionCreators, dispatch);

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

  const [cartReset, setCartReset] = useState(false);
  const showCartResetDlg = () => {
    setCartReset(true);
  };
  const hideCartResetDlg = () => {
    setCartReset(false);
  };
  const resetCart = () => {
    delete newRestWarningState['previousId'];
    insertNewRest(newRestWarningState);
    hideCartResetDlg();
  };
  useEffect(() => {
    if (newRestWarningState.restaurantId) {
      showCartResetDlg();
    }
  }, [newRestWarningState]);

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

  const [canvas, setCanvas] = useState(false);

  const showCanvas = () => {
    setCanvas(true);
  };

  const closeCanvas = () => {
    setCanvas(false);
  };

  const handleFilterChange = (e) => {
    setFilter((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (e.target.name === 'VegType') {
      updateVegType({ [e.target.name]: e.target.value });
    } else {
      updateDeliveryMode({ [e.target.name]: e.target.value });
    }
  };

  const filters = (
    <Offcanvas show={canvas} onHide={closeCanvas}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Filters</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Form.Group className='mb-3' controlId='filterDishType'>
          <Form.Label>Dish Type: </Form.Label>
          <Form.Select
            aria-label='vegType'
            value={filter.vegType}
            onChange={handleFilterChange}
            name='vegType'
          >
            {Object.keys(VEG).map((key) => (
              <option key={key} value={key}>
                {VEG[key]}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <Form.Group className='mb-3' controlId='filterDeliveryType'>
          <Form.Label>Delivery Type: </Form.Label>
          <Form.Select
            aria-label='delivery'
            value={filter.delivery}
            onChange={handleFilterChange}
            name='delivery'
          >
            {Object.keys(ORDER_DELIVERY_MODE).map((key) => (
              <option key={key} value={key}>
                {ORDER_DELIVERY_MODE[key]}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
      </Offcanvas.Body>
    </Offcanvas>
  );

  const cart = (
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
  );

  const resetCartDlg = (
    <Modal show={cartReset} onHide={hideCartResetDlg}>
      <Modal.Header closeButton>
        <Modal.Title>Create new order ?</Modal.Title>
      </Modal.Header>
      <Modal.Body>{`Your order contains items from restaurant id ${newRestWarningState.previousId}. create new order to add items from restaurant id ${newRestWarningState.restaurantId}`}</Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={hideCartResetDlg}>
          No
        </Button>
        <Button variant='primary' onClick={resetCart}>
          Yes
        </Button>
      </Modal.Footer>
    </Modal>
  );

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
                <Nav.Item>
                  <Nav.Link title='Item' onClick={showCanvas}>
                    Filters
                  </Nav.Link>
                </Nav.Item>
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
        {filters}
        {cart}
        {resetCartDlg}
      </Container>
    </div>
  );
}

export default Navigator;
