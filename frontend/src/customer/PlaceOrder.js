import React, { useEffect, useState } from 'react';
import { Card, Col, Container, Form, Row, Table } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import { post } from '../utils/serverCall';
import { Link } from 'react-router-dom';

function PlaceOrder() {
  const cartState = useSelector((state) => state.cartReducer);
  const [totalCost, setTotalCost] = useState(0);
  const [status, setStatus] = useState(0); // 0- not placed, 1- order placed.
  useEffect(() => {
    setTotalCost(0);
    Object.keys(cartState.dishes).forEach((key) => {
      setTotalCost(
        (prev) => prev + cartState.dishes[key][0] * cartState.dishes[key][1]
      );
    });
  }, [cartState]);

  useEffect(() => {
    // get address list here.
  });

  const handlePlaceOrder = () => {
    post('/placeOrder', {
      restaurantId: cartState.restaurantId,
      addressId: 'main',
    })
      .then((response) => {
        setStatus(1);
        console.log(response);
      })
      .catch(() => {});
  };

  if (status === 1) {
    return (
      <Container>
        <Row>
          <Card style={{ width: '18rem', margin: 'auto' }}>
            <Card.Body>
              <Card.Title>Placed Order succesfully</Card.Title>
              <Link to='/myOrders' className='nav-link'>
                Go to my orders page
              </Link>
              {/* <Card.Link href='/signin'>Go to login page</Card.Link> */}
            </Card.Body>
          </Card>
        </Row>
      </Container>
    );
  }
  return (
    <Container>
      <Row>{`Restaurant Name: ${cartState.restaurantId}`}</Row>
      <Row>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Dish Name</th>
              <th>Count</th>
              <th>Price</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(cartState.dishes).map((key) => (
              <tr key={key}>
                <td>{key}</td>
                <td>{cartState.dishes[key][0]}</td>
                <td>{'$' + cartState.dishes[key][1]}</td>
                <td>
                  {'$' + cartState.dishes[key][0] * cartState.dishes[key][1]}
                </td>
              </tr>
            ))}
            <tr>
              <td>Bill Amount</td>
              <td>{}</td>
              <td>{}</td>
              <td>{'$' + totalCost}</td>
            </tr>
          </tbody>
        </Table>
      </Row>
      <Row>
        <Form.Label>Select Address: </Form.Label>
        <Button variant='dark'>Add New Address</Button>
      </Row>
      <Row>
        <Button variant='dark' onClick={handlePlaceOrder}>
          Place Order
        </Button>
      </Row>
    </Container>
  );
}

export default PlaceOrder;
