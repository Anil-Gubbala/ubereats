import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import CardGroup from 'react-bootstrap/CardGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { get } from '../utils/serverCall';
import { Link } from 'react-router-dom';

function CustomerHome() {
  const defaultValues = [];

  const [restaurantsInfo, setRestaurantsInfo] = useState(defaultValues);
  useEffect(() => {
    get('/getRestaruantsList').then((data) => {
      setRestaurantsInfo(() => data);
    });
  }, []);

  const handleView = () => {};

  return (
    <Container>
      <Row className='g-4'>
        {restaurantsInfo.map((each) => (
          <Col key={each.name}>
            <Card style={{ width: '18rem' }}>
              <Card.Img
                style={{ height: '140px' }}
                variant='top'
                src={each.picture}
              />
              <Card.Body>
                <Card.Title>{each.name}</Card.Title>
                <Card.Text>{each.description}</Card.Text>
                <Link
                  to={`/restaurant?id=${each.email}`}
                  className='pure-menu-link'
                >
                  View Menu
                </Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default CustomerHome;
