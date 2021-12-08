import Button from "react-bootstrap/Button";
import React, { useState, useEffect } from "react";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import { Redirect } from "react-router";
import cookie from "react-cookies";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import {
  useQuery,
  useLazyQuery,
  gql,
  useMutation,
  useApolloClient,
} from "@apollo/client";

import { Alert } from "react-bootstrap";
import { post } from "../utils/serverCall";
import CONSTANTS, { COOKIE } from "../utils/consts";
import { actionCreators } from "../reducers/actionCreators";
import { signin } from "../graphql/queries";
import client from "../graphql/client";
import { doQuery } from "../graphql/serverCall";

function Signin() {
  // const { data: { user: newUser } = {}, loading, refetch } = useQuery(qSignin);
  // console.log(data);
  // if (!loading) {
  //   console.log(newUser);
  // }

  // const client = useApolloClient();
  // client
  //   .query({
  //     query: signin,
  //     variables: { email: "u1@gmail.com", password: "asdf", customer: true },
  //   })
  //   .then(({ data: { signin: data } }) => {
  //     console.log(data);
  //   })
  //   .catch((err) => console.log(err));
  // client.mutate

  // doQuery(
  //   signin,
  //   { email: "u1@gmail.com", password: "asdf", customer: true },
  //   "signin"
  // )
  //   .then((data) => {
  //     console.log(data);
  //   })
  //   .catch((err) => console.log(err));

  const dispatch = useDispatch();
  const currentState = useSelector((state) => state.loggedReducer);
  const { customer, restaurant } = bindActionCreators(actionCreators, dispatch);
  const defaultValues = {
    customer: true,
    email: "",
    password: "",
  };

  const [formData, setFormData] = useState(defaultValues);
  // const [success, setSuccess] = useState(false);
  const [fail, setFail] = useState({ status: false, message: "" });
  useEffect(() => {
    setFormData({ ...formData, email: currentState.email });
    // console.log(currentState.email);
  }, [currentState]);

  const handleSubmit = (e) => {
    e.preventDefault();
    doQuery(
      signin,
      { email: "u1@gmail.com", password: "asdf", customer: true },
      "signin"
    )
      .then((data) => {
        if (formData.customer) {
          localStorage.setItem(CONSTANTS.STR_KEY, CONSTANTS.STR_USER);
          localStorage.setItem(CONSTANTS.STATUS, data.status);
          customer(formData.email);
        } else {
          localStorage.setItem(CONSTANTS.STR_KEY, CONSTANTS.STR_RESTAURANT);
          localStorage.setItem(CONSTANTS.STATUS, data.status);
          restaurant(formData.email);
        }
        // setSuccess(true);
      })
      .catch((result) => {
        setFail({ status: true, message: result });
      });
  };

  const eventHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const checkBoxHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: !e.target.checked });
  };

  if (localStorage.getItem(CONSTANTS.STR_KEY)) {
    return <Redirect to="/home" />;
  }
  return (
    <Container>
      <Col>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              name="email"
              onChange={eventHandler}
              type="email"
              placeholder="Enter email"
              required
              value={formData.email ? formData.email : ""}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              name="password"
              type="password"
              onChange={eventHandler}
              placeholder="Password"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formCheckbox">
            <Form.Check
              name="customer"
              type="checkbox"
              label="Login as Restaurant owner"
              onChange={checkBoxHandler}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Col>
      {fail.status && <Alert variant="danger">{fail.message}</Alert>}
    </Container>
  );
}

export default Signin;
