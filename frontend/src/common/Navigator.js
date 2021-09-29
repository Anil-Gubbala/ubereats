import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import cookie from 'react-cookies';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';

import { COOKIE } from '../utils/consts';
import { actionCreators } from '../reducers/actionCreators';

function Navigator() {
  const logged = useSelector((state) => state.loggedReducer);

  const dispatch = useDispatch();
  const { signout, customer, restaurant } = bindActionCreators(
    actionCreators,
    dispatch
  );

  useEffect(() => {
    if (localStorage.getItem('ubereats') === 'customer') {
      customer();
    } else if (localStorage.getItem('ubereats') === 'restaurant') {
      restaurant();
    } else {
      signout();
    }
  });

  return (
    <div>
      <Container fluid>
        <Row>
          <Navbar bg='dark' variant='dark'>
            <Container>
              <Navbar.Brand href='home'>Uber Eats</Navbar.Brand>
              <Nav className='me-auto'>
                <Nav.Link href=''>Home</Nav.Link>
              </Nav>
              <Nav>
                {logged === 0 && <Nav.Link href='signup'>Signup</Nav.Link>}
                {logged === 0 && <Nav.Link href='signin'>Singin</Nav.Link>}
                {logged !== 0 && <Nav.Link href='signout'>Signout</Nav.Link>}
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
