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

function App() {
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
  //   const dispatch = useDispatch();
  //   const { doGet, doPost } = bindActionCreators(apiActionCreators, dispatch);
  //   const myOrdersApi = useSelector((state) => state.myOrdersApi);
  //   const cancelMyOrderApi = useSelector((state) => state.cancelMyOrderApi);
  //   const getOrderDetailsApi = useSelector((state) => state.getOrderDetailsApi);
  //   const getOrderCountApi = useSelector((state) => state.getOrderCountApi);

  const [filter, setFilter] = useState(0);
  const [deliveryType, setDeliveryType] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const [cancelIndex, setCancelIndex] = useState(null);

  const [cancelMyOrderFlag, setCancelMyOrderFlag] = useState(false);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(2);
  const [totalPages, setTotalPages] = useState(-1);

  return (
    <Container>
      <div>
        <label>Hello</label>
      </div>
    </Container>
  );
}

export default App;
