import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';

import cookie from 'react-cookies';

import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import CONSTANTS from '../utils/consts';
import { actionCreators } from '../reducers/actionCreators';

function Navigator() {
  const currentState = useSelector((state) => state.loggedReducer);
  const cookieData = cookie.load(CONSTANTS.COOKIE);
  const dispatch = useDispatch();
  const { signout, customer, restaurant } = bindActionCreators(
    actionCreators,
    dispatch
  );

  const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      right: -3,
      top: 13,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: '0 4px',
    },
  }));

  useEffect(() => {
    // if (!cookieData) {
    //   localStorage.removeItem(CONSTANTS.STR_KEY);
    // }
    // if (localStorage.getItem(CONSTANTS.STR_KEY) === CONSTANTS.STR_USER) {
    //   customer();
    // } else if (
    //   localStorage.getItem(CONSTANTS.STR_KEY) === CONSTANTS.STR_RESTAURANT
    // ) {
    //   restaurant();
    // } else {
    //   signout();
    // }
  });

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
                <IconButton aria-label='cart'>
                  <StyledBadge badgeContent={0} color='secondary'>
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
      </Container>
    </div>
  );
}

export default Navigator;
