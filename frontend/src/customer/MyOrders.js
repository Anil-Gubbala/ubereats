import React, { useEffect, useState } from 'react';
import {
  Card,
  Col,
  Container,
  FloatingLabel,
  Form,
  Row,
  Table,
} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { get } from '../utils/serverCall';

import {
  DELIVERY_STATUS,
  ORDER_DELIVERY_MODE,
  PICKUP_STATUS,
} from '../utils/consts';

function MyOrders() {
  const [data, setData] = useState([]);
  const [dishesData, setDishesData] = useState([]);
  const defaultOrderInfo = {
    restaurant_id: '',
    status: '',
    order_id: '',
  };
  const [orderInfo, setOrderInfo] = useState(defaultOrderInfo);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [filter, setFilter] = useState(0);
  const [deliveryType, setDeliveryType] = useState(0);

  const getMyOrders = (param1, param2) => {
    get('/myOrders', { deliveryType: param1, filter: param2 })
      .then((response) => {
        setData(response);
      })
      .catch(() => {});
  };

  useEffect(() => {
    getMyOrders(deliveryType, filter);
  }, []);

  const showDetails = (e) => {
    const id = e.target.getAttribute('name');
    get('/getOrderDetails', { id })
      .then((response) => {
        setOrderInfo((prev) => ({
          ...prev,
          restaurant_id: e.target.getAttribute('restaurant'),
          status: e.target.getAttribute('status'),
          order_id: e.target.getAttribute('name'),
        }));
        setDishesData(response);
        handleShow();
      })
      .catch(() => {});
  };

  const detailsDialog = (
    <Modal show={show} onHide={handleClose} animation={false}>
      <Modal.Header closeButton>
        <Modal.Title>Order Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>{`Restaurant ID : ${orderInfo.restaurant_id}`}</Row>
        {/* <Row>{`Status : ${orderInfo.status}`}</Row> */}
        <Row>{`Order ID : ${orderInfo.order_id}`}</Row>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Dish Name</th>
              <th>Count</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {dishesData.map((each) => (
              <tr key={each.dish}>
                <td>{each.dish}</td>
                <td>{each.count}</td>
                <td>{each.price}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );

  return (
    <Container>
      <Row>
        <Col>
          <FloatingLabel
            style={{ marginTop: '8px' }}
            controlId='floatingSelect'
            label='Select Delivery Type'
          >
            <Form.Select
              aria-label='Default select example'
              value={deliveryType}
              onChange={(e) => {
                setDeliveryType(parseInt(e.target.value, 10));
                getMyOrders(parseInt(e.target.value, 10), filter);
              }}
            >
              {Object.keys(ORDER_DELIVERY_MODE).map((key) => (
                <option key={key} value={key}>
                  {ORDER_DELIVERY_MODE[key]}
                </option>
              ))}
            </Form.Select>
          </FloatingLabel>
        </Col>
        <Col>
          <FloatingLabel
            style={{ marginTop: '8px' }}
            controlId='floatingSelect'
            label='Select Order Type'
          >
            <Form.Select
              aria-label='Default select example'
              value={filter}
              onChange={(e) => {
                setFilter(parseInt(e.target.value, 10));
                getMyOrders(deliveryType, parseInt(e.target.value, 10));
              }}
            >
              {deliveryType === 0 &&
                Object.keys(DELIVERY_STATUS).map((key) => (
                  <option key={key} value={key}>
                    {DELIVERY_STATUS[key]}
                  </option>
                ))}
              {deliveryType === 1 &&
                Object.keys(PICKUP_STATUS).map((key) => (
                  <option key={key} value={key}>
                    {PICKUP_STATUS[key]}
                  </option>
                ))}
            </Form.Select>
          </FloatingLabel>
        </Col>
      </Row>
      <Row>My Orders : </Row>
      <Row>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>order ID</th>
              <th>Restaurant</th>
              <th>Date</th>
              <th>Status</th>
              <th>Address</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {data.map((each) => (
              <tr key={each.id}>
                <td>{each.id}</td>
                <td>{each.restaurant_id}</td>
                <td>{each.date}</td>
                <td>
                  {each.delivery === 0
                    ? DELIVERY_STATUS[each.status]
                    : PICKUP_STATUS[each.status]}
                </td>
                <td>{each.delivery === 0 ? each.location : 'Pick up'}</td>
                <td>
                  <Button
                    name={each.id}
                    restaurant={each.restaurant_id}
                    status={each.status}
                    variant='link'
                    onClick={showDetails}
                  >
                    Details
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Row>
      {detailsDialog}
    </Container>
  );
}

export default MyOrders;
