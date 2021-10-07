import React from 'react';
import { Card, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Invalid() {
  return (
    <Container>
      <Row>
        <Card style={{ width: '18rem', margin: 'auto' }}>
          <Card.Body>
            <Card.Title>Unauthorized access</Card.Title>
            <Link to='/home' className='nav-link'>
              Go to Home page
            </Link>
            {/* <Card.Link href='/signin'>Go to login page</Card.Link> */}
          </Card.Body>
        </Card>
      </Row>
    </Container>
  );
}

export default Invalid;
