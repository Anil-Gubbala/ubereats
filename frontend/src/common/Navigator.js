import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import cookie from 'react-cookies';
import { useSelector } from 'react-redux';

import { COOKIE } from '../utils/consts';

function Navigator() {
  const logged = useSelector((state) => state.loggedReducer);
  console.log(logged);

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
                {!cookie.load(COOKIE) && (
                  <Nav.Link href='signup'>Signup</Nav.Link>
                )}
                {!cookie.load(COOKIE) && (
                  <Nav.Link href='signin'>Singin</Nav.Link>
                )}
                {cookie.load(COOKIE) && (
                  <Nav.Link href='signout'>Signout</Nav.Link>
                )}
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
