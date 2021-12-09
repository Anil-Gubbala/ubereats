import React, { useEffect, useState } from "react";
import {
  Card,
  Col,
  Container,
  FloatingLabel,
  Form,
  Row,
  Table,
} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
// import cookie from "react-cookies";

import { Link } from "react-router-dom";
import { get, post } from "../utils/serverCall";

import CONSTANTS, {
  DELIVERY_STATUS,
  PICKUP_STATUS,
  REST_ORDER_FILTER,
} from "../utils/consts";
import RedirectSignin from "../common/RedirectSignin";
import RedirectInvalid from "../common/RedirectInvalid";
import { isCustomer, isSignedIn } from "../utils/checkAuth";
import { doMutate, doQuery } from "../graphql/serverCall";
import {
  gqlGetOrderDetails,
  gqlGetRestaurantOrders,
  gqlUpdateOrderStatus,
} from "../graphql/queries";

function RestaurantOrders() {
  // const appCookies = cookie.load(CONSTANTS.COOKIE);
  const isCustomerLogin = isCustomer();
  if (!isSignedIn()) {
    return <RedirectSignin />;
  }
  if (isCustomerLogin) {
    return <RedirectInvalid />;
  }

  const [data, setData] = useState([]);
  const [dishesData, setDishesData] = useState([]);
  const defaultOrderInfo = {
    user_id: "",
    status: "",
    order_id: "",
    index: 0,
  };
  const [orderInfo, setOrderInfo] = useState(defaultOrderInfo);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [orderStatus, setOrderStatus] = useState(0);
  const [detailsDelivery, setDetailsDelivery] = useState(0);
  const [disableUpdate, setDisableUpdate] = useState(true);
  const [filter, setFilter] = useState(0);
  const [totalCost, setTotalCost] = useState(0);

  const getRestaurantOrders = (type) => {
    doQuery(
      gqlGetRestaurantOrders,
      { filter: parseInt(type, 10) },
      "getRestaurantOrders"
    )
      // get("/getRestaurantOrders", { filter: type })
      .then((response) => {
        setData(response);
      })
      .catch(() => {});
  };

  useEffect(() => {
    getRestaurantOrders(filter);
  }, []);

  const showDetails = (e) => {
    const id = e.target.getAttribute("name");
    doQuery(gqlGetOrderDetails, { id: parseInt(id, 10) }, "getOrderDetails")
      // get("/getOrderDetails", { id })
      .then((response) => {
        setOrderInfo((prev) => ({
          ...prev,
          user_id: e.target.getAttribute("user"),
          status: e.target.getAttribute("status"),
          order_id: e.target.getAttribute("name"),
          index: e.target.getAttribute("index"),
        }));
        setTotalCost(() =>
          response.reduce((prev, next) => {
            let total = parseFloat(prev) + next.count * next.price;
            total = parseFloat(total.toFixed(2));
            return total;
          }, 0)
        );
        setOrderStatus(e.target.getAttribute("status"));
        setDetailsDelivery(parseInt(e.target.getAttribute("delivery"), 10));
        setDishesData(response);
        handleShow();
      })
      .catch(() => {});
  };

  const updateOrderStatus = () => {
    doMutate(
      gqlUpdateOrderStatus,
      {
        order_id: parseInt(orderInfo.order_id, 10),
        status: parseInt(orderStatus, 10),
      },
      "updateOrderStatus"
    )
      // post("/updateOrderStatus", {
      //   order_id: orderInfo.order_id,
      //   status: orderStatus,
      // })
      .then(() => {
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
        <FloatingLabel
          style={{ marginTop: "8px" }}
          controlId="floatingSelect"
          label="Select Order Type"
        >
          <Form.Select
            aria-label="Default select example"
            value={filter}
            onChange={(e) => {
              setFilter(e.target.value);
              getRestaurantOrders(e.target.value);
            }}
          >
            {Object.keys(REST_ORDER_FILTER).map((key) => (
              <option key={key} value={key}>
                {REST_ORDER_FILTER[key]}
              </option>
            ))}
          </Form.Select>
        </FloatingLabel>
      </Row>

      <Row style={{ marginTop: "8px" }}>
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
                  <Link to={`/profile?id=${each.user_id}`} className="nav-link">
                    {each.user_id}
                  </Link>
                </td>
                <td>{each.date}</td>
                <td>{each.delivery === 0 ? each.location : "Pick up"}</td>
                <td>
                  {each.delivery === 0
                    ? DELIVERY_STATUS[each.status]
                    : PICKUP_STATUS[each.status]}
                </td>
                <td>
                  <Button
                    name={each.id}
                    user={each.user_id}
                    status={each.status}
                    delivery={each.delivery}
                    index={index}
                    variant="link"
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
                aria-label="Default select example"
                value={orderStatus}
                disabled={orderStatus >= 3}
                onChange={(e) => {
                  setOrderStatus(e.target.value);
                  setDisableUpdate(false);
                }}
              >
                {detailsDelivery === 0 &&
                  Object.keys(DELIVERY_STATUS).map((key) => (
                    <option key={key} disabled={orderStatus > key} value={key}>
                      {DELIVERY_STATUS[key]}
                    </option>
                  ))}
                {detailsDelivery === 1 &&
                  Object.keys(PICKUP_STATUS).map((key) => (
                    <option key={key} disabled={orderStatus > key} value={key}>
                      {PICKUP_STATUS[key]}
                    </option>
                  ))}
              </Form.Select>
            </Col>
          </Row>
          <Row>{`Order ID : ${orderInfo.order_id}`}</Row>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Dish Name</th>
                <th>Count</th>
                <th>Price ($)</th>
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
                <td />
                <td>{totalCost}</td>
              </tr>
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            onClick={updateOrderStatus}
            disabled={disableUpdate}
            variant="primary"
          >
            Update Order Status
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default RestaurantOrders;
