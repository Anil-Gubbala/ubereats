import React, { useEffect, useState } from 'react';
import { Col, Container, Row, Table } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';

function PlaceOrder() {
  const cartState = useSelector((state) => state.cartReducer);
  const [totalCost, setTotalCost] = useState(0);

  useEffect(() => {
    setTotalCost(0);
    Object.keys(cartState.dishes).forEach((key) => {
      setTotalCost(
        (prev) => prev + cartState.dishes[key][0] * cartState.dishes[key][1]
      );
    });
  }, [cartState]);
  return (
    <Container>
      <Row>{cartState.restaurantId}</Row>
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
      <Row>Add Address Selection here</Row>
      <Row>
        <Button variant='dark'>Place Order</Button>
      </Row>
    </Container>
  );
}

export default PlaceOrder;
