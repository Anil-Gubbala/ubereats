import React, { useEffect, useState } from 'react';
import { Card, Col, Container, FloatingLabel, Form, Row, Table } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import TablePagination from '@mui/material/TablePagination';
import { get } from '../utils/serverCall';

import { DELIVERY_STATUS, ORDER_DELIVERY_MODE, PICKUP_STATUS } from '../utils/consts';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { apiActionCreators } from '../reducers/actionCreators';

function MyOrders() {
  const [data, setData] = useState([]);
  const [dishesData, setDishesData] = useState([]);
  const defaultOrderInfo = {
    restaurantId: '',
    status: '',
    orderId: '',
  };
  const [orderInfo, setOrderInfo] = useState(defaultOrderInfo);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const dispatch = useDispatch();
  const { doGet, doPost } = bindActionCreators(apiActionCreators, dispatch);
  const myOrdersApi = useSelector((state) => state.myOrdersApi);
  const cancelMyOrderApi = useSelector((state) => state.cancelMyOrderApi);
  const getOrderDetailsApi = useSelector((state) => state.getOrderDetailsApi);
  const getOrderCountApi = useSelector((state) => state.getOrderCountApi);

  const [filter, setFilter] = useState(0);
  const [deliveryType, setDeliveryType] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const [cancelIndex, setCancelIndex] = useState(null);

  const [cancelMyOrderFlag, setCancelMyOrderFlag] = useState(false);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(2);
  const [totalPages, setTotalPages] = useState(-1);

  const getMyOrders = (param1, param2, perPage = rowsPerPage, currentPage = 0) => {
    doGet('/myOrders', { deliveryType: param1, filter: param2, rowsPerPage: perPage, currentPage });
    // get('/myOrders', { deliveryType: param1, filter: param2 })
    //   .then((response) => {
    //     setData(response);
    //   })
    //   .catch(() => {});
  };

  useEffect(() => {
    if (myOrdersApi.status === 1) {
      if (myOrdersApi.error === '') {
        setData(myOrdersApi.response);
      }
    }
  }, [myOrdersApi]);

  const getOrderCount = (deliveryType, filter) => {
    doGet('/getOrderCount', { deliveryType, filter });
  };

  const handleChangePage = (e, newPage, dType = deliveryType, filt = filter) => {
    setPage(newPage);
    getMyOrders(dType, filt, rowsPerPage, newPage);
  };

  const handleFilterChange = (dType = deliveryType, filt = filter) => {
    getOrderCount(dType, filt);
    handleChangePage({}, 0, dType, filt);
  };

  const handleChangeRowsPerPage = (event) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(newRowsPerPage);
    setPage(0);
    getMyOrders(deliveryType, filter, newRowsPerPage, 0);
  };

  useEffect(() => {
    getOrderCount(deliveryType, filter);
  }, []);

  useEffect(() => {
    if (getOrderCountApi.status === 1) {
      if (getOrderCountApi.error === '') {
        setTotalPages(getOrderCountApi.response.count);
      }
    }
  }, [getOrderCountApi]);

  useEffect(() => {
    getMyOrders(deliveryType, filter);
  }, []);

  const showDetails = (e) => {
    const index = e.target.getAttribute('index');
    setOrderInfo((prev) => ({
      ...prev,
      index: e.target.getAttribute('index'),
      restaurantId: e.target.getAttribute('restaurant'),
      status: e.target.getAttribute('status'),
      orderId: e.target.getAttribute('name'),
      instructions: e.target.getAttribute('instructions'),
    }));
    setTotalCost(() =>
      data[index].dishes.reduce((prev, next) => {
        let total = parseFloat(prev) + next.count * next.price;
        total = parseFloat(total.toFixed(2));
        return total;
      }, 0)
    );
    setDishesData(data[index].dishes);
    handleShow();
    // doGet('/getOrderDetails', { id });
    // get('/getOrderDetails', { id })
    //   .then((response) => {
    //     setTotalCost(() =>
    //       response.reduce((prev, next) => {
    //         let total = parseFloat(prev) + next.count * next.price;
    //         total = parseFloat(total.toFixed(2));
    //         return total;
    //       }, 0)
    //     );
    //     setDishesData(response);
    //     handleShow();
    //   })
    //   .catch(() => {});
  };

  useEffect(() => {
    if (getOrderDetailsApi.status === 1) {
      if (getOrderDetailsApi.error === '') {
        setTotalCost(() =>
          getOrderDetailsApi.response.reduce((prev, next) => {
            let total = parseFloat(prev) + next.count * next.price;
            total = parseFloat(total.toFixed(2));
            return total;
          }, 0)
        );
        setDishesData(getOrderDetailsApi.response);
        handleShow();
      }
    }
  }, [getOrderDetailsApi]);

  useEffect(() => {
    if (cancelMyOrderFlag && cancelMyOrderApi.status === 1) {
      if (cancelMyOrderApi.error === '') {
        // data.splice(cancelIndex, 1);
        setCancelMyOrderFlag(false);
        handleClose();
        setData((prev) => {
          const prevOrder = prev[cancelIndex];
          prevOrder.status = 4;
          return prev;
        });
      }
    }
  }, [cancelMyOrderApi]);

  const cancelMyOrder = (e) => {
    setCancelIndex(e.target.getAttribute('index'));
    setCancelMyOrderFlag(true);
    doPost('/cancelMyOrder', {
      orderId: e.target.getAttribute('orderid'),
    });
  };

  const detailsDialog = (
    <Modal show={show} onHide={handleClose} animation={false}>
      <Modal.Header closeButton>
        <Modal.Title>Order Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>{`Restaurant ID : ${orderInfo.restaurantId}`}</Row>
        {/* <Row>{`Status : ${orderInfo.status}`}</Row> */}
        <Row>{`Order ID : ${orderInfo.orderId}`}</Row>
        {orderInfo.instructions && <Row>{`Instructions : ${orderInfo.instructions}`}</Row>}
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Dish Name</th>
              <th>Count</th>
              <th>Price($)</th>
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
            <tr>
              <td>Total</td>
              <td></td>
              <td>{totalCost}</td>
            </tr>
          </tbody>
        </Table>
        {parseInt(orderInfo.status, 10) === 0 && (
          <Row>
            <Button
              orderid={orderInfo.orderId}
              index={orderInfo.index}
              onClick={cancelMyOrder}
              style={{ marginLeft: 'auto', width: 'fit-content' }}
              siez="sm"
            >
              Cancel Order
            </Button>
          </Row>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
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
            controlId="floatingSelect"
            label="Select Delivery Type"
          >
            <Form.Select
              aria-label="Default select example"
              value={deliveryType}
              onChange={(e) => {
                setDeliveryType(parseInt(e.target.value, 10));
                handleFilterChange(parseInt(e.target.value, 10), filter);
                // getMyOrders(parseInt(e.target.value, 10), filter);
                // getOrderCount(parseInt(e.target.value, 10), filter);
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
            controlId="floatingSelect"
            label="Select Order Type"
          >
            <Form.Select
              aria-label="Default select example"
              value={filter}
              onChange={(e) => {
                setFilter(parseInt(e.target.value, 10));
                handleFilterChange(deliveryType, parseInt(e.target.value, 10));
                // getMyOrders(deliveryType, parseInt(e.target.value, 10));
                // getOrderCount(deliveryType, parseInt(e.target.value, 10));
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
            {data.map((each, index) => (
              <tr key={each._id}>
                <td>{each._id}</td>
                <td>{each.restaurantId}</td>
                <td>{new Date(each.date).toUTCString()}</td>
                <td>
                  {each.delivery === 0 ? DELIVERY_STATUS[each.status] : PICKUP_STATUS[each.status]}
                </td>
                <td>{each.delivery === 0 ? each.address : 'Pick up'}</td>
                <td>
                  <Button
                    name={each._id}
                    restaurant={each.restaurantId}
                    status={each.status}
                    instructions={each.instructions}
                    variant="link"
                    index={index}
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
      <Row>
        <TablePagination
          component="div"
          count={totalPages}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[2, 5, 10]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Row>
      {detailsDialog}
    </Container>
  );
}

export default MyOrders;
