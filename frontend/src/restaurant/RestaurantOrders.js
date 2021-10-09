import React, { useEffect, useState } from 'react';
import { Card, Col, Container, Form, Row, Table } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import cookie from 'react-cookies';

import { get, post } from '../utils/serverCall';

import CONSTANTS, { ORDER_STATUS } from '../utils/consts';
import RedirectSignin from '../common/RedirectSignin';
import RedirectInvalid from '../common/RedirectInvalid';
import { Link } from 'react-router-dom';

function RestaurantOrders() {
  const appCookies = cookie.load(CONSTANTS.COOKIE);
  const isCustomer = appCookies && appCookies[CONSTANTS.COOKIE_KEY.ISCUSTOMER];
  if (!appCookies) {
    return <RedirectSignin />;
  }
  if (isCustomer) {
    return <RedirectInvalid />;
  }

  const [data, setData] = useState([]);
  const [dishesData, setDishesData] = useState([]);
  const defaultOrderInfo = {
    user_id: '',
    status: '',
    order_id: '',
    index: 0,
  };
  const [orderInfo, setOrderInfo] = useState(defaultOrderInfo);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [orderStatus, setOrderStatus] = useState('0');
  const [disableUpdate, setDisableUpdate] = useState(true);

  useEffect(() => {
    get('/getRestaurantOrders')
      .then((response) => {
        setData(response);
      })
      .catch(() => {});
  }, []);

  const showDetails = (e) => {
    const id = e.target.getAttribute('name');
    get('/getOrderDetails', { id })
      .then((response) => {
        setOrderInfo((prev) => ({
          ...prev,
          user_id: e.target.getAttribute('user'),
          status: e.target.getAttribute('status'),
          order_id: e.target.getAttribute('name'),
          index: e.target.getAttribute('index'),
        }));
        setOrderStatus(e.target.getAttribute('status'));
        setDishesData(response);
        handleShow();
      })
      .catch(() => {});
  };

  const updateOrderStatus = () => {
    post('/updateOrderStatus', {
      order_id: orderInfo.order_id,
      status: orderStatus,
    }).then(() => {
      setDisableUpdate(true);
      setData((prev) => {
        const prevOrder = prev[orderInfo.index];
        prevOrder.status = orderStatus;
        return prev;
      });
      handleClose();
    });
  };

  return (
    <Container>
      <Row>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>order ID</th>
              <th>user_id</th>
              <th>Date</th>
              <th>Address</th>
              <th>Status</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {data.map((each, index) => (
              <tr key={each.id}>
                <td>{each.id}</td>
                <td>
                  <Link to={`/profile?id=${each.user_id}`} className='nav-link'>
                    {each.user_id}
                  </Link>
                </td>
                <td>{each.date}</td>
                <td>{each.delivery === 0 ? each.location : 'Pick up'}</td>
                <td>{ORDER_STATUS[each.status]}</td>
                <td>
                  <Button
                    name={each.id}
                    user={each.user_id}
                    status={each.status}
                    index={index}
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
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Order Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* <Row>{`User : ${orderInfo.user_id}`}</Row> */}
          <Row>
            <Col>Status:</Col>
            <Col>
              <Form.Select
                aria-label='Default select example'
                value={orderStatus}
                onChange={(e) => {
                  setOrderStatus(e.target.value);
                  setDisableUpdate(false);
                }}
              >
                <option disabled={orderStatus > 0} value={0}>
                  One
                </option>
                <option value={1}>Two</option>
                <option value={2}>Three</option>
              </Form.Select>
            </Col>
          </Row>
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
          <Button
            onClick={updateOrderStatus}
            disabled={disableUpdate}
            variant='primary'
          >
            Update Order Status
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default RestaurantOrders;
