import Button from 'react-bootstrap/Button';
import React, { useState } from 'react';
import Col from 'react-bootstrap/esm/Col';
import Container from 'react-bootstrap/esm/Container';
import Form from 'react-bootstrap/Form';
import { Redirect } from 'react-router';
import cookie from 'react-cookies';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';

import { post } from '../utils/serverCall';
import { COOKIE } from '../utils/consts';
import { actionCreators } from '../reducers/actionCreators';

function Signin() {
  const dispatch = useDispatch();
  const { customer, restaurant } = bindActionCreators(actionCreators, dispatch);
  const defaultValues = {
    customer: true,
    email: '',
    password: '',
  };

  const [formData, setFormData] = useState(defaultValues);
  const [success, setSuccess] = useState(false);
  const [fail, setFail] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    post('/signin', formData)
      .then((data) => {
        if (formData.customer) {
          customer();
        } else {
          restaurant();
        }
        setSuccess(true);
      })
      .catch(() => {
        setFail(true);
      });
  };

  const eventHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const checkBoxHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: !e.target.checked });
  };

  if (success || cookie.load(COOKIE)) {
    return <Redirect to='/home'></Redirect>;
  }
  return (
    <Container>
      <Col>
        <Form onSubmit={handleSubmit}>
          <Form.Group className='mb-3' controlId='formEmail'>
            <Form.Label>Email address</Form.Label>
            <Form.Control
              name='email'
              onChange={eventHandler}
              type='email'
              placeholder='Enter email'
              required
            />
          </Form.Group>
          <Form.Group className='mb-3' controlId='formPassword'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              name='password'
              type='password'
              onChange={eventHandler}
              placeholder='Password'
              required
            />
          </Form.Group>
          <Form.Group className='mb-3' controlId='formCheckbox'>
            <Form.Check
              name='customer'
              type='checkbox'
              label='Login as Restaurant owner'
              onChange={checkBoxHandler}
            />
          </Form.Group>
          <Button variant='primary' type='submit'>
            Submit
          </Button>
        </Form>
      </Col>
    </Container>
  );
}

export default Signin;
