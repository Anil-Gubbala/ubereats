import Button from 'react-bootstrap/Button';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';
import Container from 'react-bootstrap/esm/Container';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';

import { post } from '../utils/serverCall';

function Signup() {
  const defaultValues = {
    restaurantName: '',
    name: '',
    email: '',
    password: '',
    address: '',
    city: '',
    state: '',
    country: '',
    zip: '',
    accountType: '0',
  };

  const [formData, setFormData] = useState(defaultValues);
  const [success, setSuccess] = useState(false);
  const [fail, setFail] = useState(false);

  const eventHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(formData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    post('/signup', formData)
      .then(() => {
        setSuccess(true);
      })
      .catch(() => {
        setFail(true);
      });
  };

  if (success) {
    return (
      <Container>
        <Row>
          <Card style={{ width: '18rem', margin: 'auto' }}>
            <Card.Body>
              <Card.Title>Registration success</Card.Title>

              <Card.Link href='/signin'>Go to login page</Card.Link>
            </Card.Body>
          </Card>
        </Row>
      </Container>
    );
  }
  return (
    <Container>
      <Col>
        <Form onSubmit={handleSubmit}>
          <Form.Group className='mb-3' controlId='Restaurant name'>
            <Form.Label>Account type</Form.Label>
            <Form.Check
              label='Customer'
              name='accountType'
              type='radio'
              id='customerSignup'
              value='0'
              defaultChecked
              onChange={eventHandler}
            />
            <Form.Check
              label='Restaurant'
              name='accountType'
              type='radio'
              value='1'
              id='restaurantSignup'
              onChange={eventHandler}
            />
          </Form.Group>
          {formData.accountType === '0' && (
            <Form.Group className='mb-3' controlId='Restaurant name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                name='Name'
                type='text'
                placeholder='Name'
                onChange={eventHandler}
                required
              />
            </Form.Group>
          )}
          {formData.accountType === '1' && (
            <Form.Group className='mb-3' controlId='Restaurant name'>
              <Form.Label>Restaurant Name</Form.Label>
              <Form.Control
                name='restaurantName'
                type='text'
                placeholder='Restaurant Name'
                onChange={eventHandler}
                required
              />
            </Form.Group>
          )}
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
          {formData.accountType === '1' && (
            <div>
              <Form.Group className='mb-3' controlId='formAddress'>
                <Form.Label>Address</Form.Label>
                <Form.Control
                  onChange={eventHandler}
                  name='address'
                  placeholder='Apartment, floor'
                  required
                />
              </Form.Group>
              <Row className='mb-3'>
                <Form.Group as={Col} controlId='formCity'>
                  <Form.Label>City</Form.Label>
                  <Form.Control onChange={eventHandler} name='city' />
                </Form.Group>

                <Form.Group as={Col} controlId='formCity'>
                  <Form.Label>State</Form.Label>
                  <Form.Control onChange={eventHandler} name='state' />
                </Form.Group>

                <Form.Group as={Col} controlId='formState'>
                  <Form.Label>Country</Form.Label>
                  <Form.Select
                    name='country'
                    onChange={eventHandler}
                    defaultValue='Choose...'
                  >
                    <option>Choose...</option>
                    <option>...</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group as={Col} controlId='formZip'>
                  <Form.Label>Zip</Form.Label>
                  <Form.Control onChange={eventHandler} name='zip' />
                </Form.Group>
              </Row>
            </div>
          )}
          <Button variant='primary' type='submit'>
            Submit
          </Button>
        </Form>
      </Col>
    </Container>
  );
}

export default Signup;
