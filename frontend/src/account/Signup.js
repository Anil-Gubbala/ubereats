import Button from 'react-bootstrap/Button';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';
import Container from 'react-bootstrap/esm/Container';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';

import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { post } from '../utils/serverCall';
import { actionCreators, apiActionCreators } from '../reducers/actionCreators';
import Location from './Location';
import FileUpload from '../common/FileUpload';
import CountriesList from '../utils/CountriesList';

function Signup() {
  const dispatch = useDispatch();
  const { dispatchSignup } = bindActionCreators(actionCreators, dispatch);
  const { doPost } = bindActionCreators(apiActionCreators, dispatch);
  const signupState = useSelector((state) => state.signupApi);

  // const [address, setAddress] = useState('');
  // const [lat, setLat] = useState('');
  // const [lng, setLng] = useState('');
  const defaultValues = {
    restaurantName: '',
    name: '',
    email: '',
    password: '',
    location: '',
    latitude: '',
    longitude: '',
    zip: '',
    accountType: '0',
  };

  const [formData, setFormData] = useState(defaultValues);
  const [success, setSuccess] = useState(false);
  const [fail, setFail] = useState(false);

  const eventHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    doPost('/signup', formData);
    // post('/signup', formData)
    //   .then(() => {
    //     dispatchSignup(formData.email);
    //     setSuccess(true);
    //   })
    //   .catch(() => {
    //     setFail(true);
    //   });
  };
  useEffect(() => {
    if (signupState.status === 1) {
      if (signupState.error === '') {
        dispatchSignup(formData.email);
        setSuccess(true);
      } else {
        setFail(true);
      }
    }
  }, [signupState]);

  if (success) {
    return (
      <Container>
        <Row>
          <Card style={{ width: '18rem', margin: 'auto' }}>
            <Card.Body>
              <Card.Title>Registration success</Card.Title>
              <Link to="/signin" className="nav-link">
                Go to login page
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
      <Col>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="Restaurant name">
            <Form.Label>Account type</Form.Label>
            <Form.Check
              label="Customer"
              name="accountType"
              type="radio"
              id="customerSignup"
              value="0"
              defaultChecked
              onChange={eventHandler}
            />
            <Form.Check
              label="Restaurant"
              name="accountType"
              type="radio"
              value="1"
              id="restaurantSignup"
              onChange={eventHandler}
            />
          </Form.Group>
          {formData.accountType === '0' && (
            <Form.Group className="mb-3" controlId="Restaurant name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                name="name"
                type="text"
                placeholder="Name"
                onChange={eventHandler}
                required
              />
            </Form.Group>
          )}
          {formData.accountType === '1' && (
            <Form.Group className="mb-3" controlId="Restaurant name">
              <Form.Label>Restaurant Name</Form.Label>
              <Form.Control
                name="restaurantName"
                type="text"
                placeholder="Restaurant Name"
                onChange={eventHandler}
                required
              />
            </Form.Group>
          )}
          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              name="email"
              onChange={eventHandler}
              type="email"
              placeholder="Enter email"
              required
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
          {formData.accountType === '1' && (
            <div>
              {/* <Form.Group className='mb-3' controlId='formAddress'>
                <Form.Label>Address</Form.Label>
                <Form.Control
                  onChange={eventHandler}
                  name='address'
                  placeholder='Apartment, floor'
                  required
                />
              </Form.Group> */}
              {/* <Row className='mb-3'>
                <Form.Group as={Col} controlId='formCity'>
                  <Form.Label>City</Form.Label>
                  <Form.Control onChange={eventHandler} name='city' />
                </Form.Group>

                <Form.Group as={Col} controlId='formState'>
                  <Form.Label>State</Form.Label>
                  <Form.Control onChange={eventHandler} name='state' />
                </Form.Group>

                <Form.Group as={Col} controlId='formCountry'>
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
              </Row> */}
            </div>
          )}
          {formData.accountType === '1' && (
            <Location
              value={formData.location}
              change={(e) => {
                setFormData((prev) => ({ ...prev, location: e }));
              }}
              select={(e) => {
                geocodeByAddress(e).then((results) => {
                  setFormData((prev) => ({ ...prev, location: e }));
                  getLatLng(results[0])
                    .then(({ lat, lng }) => {
                      setFormData((prev) => ({
                        ...prev,
                        latitude: lat,
                        longitude: lng,
                      }));
                    })
                    .catch((error) => console.log(error));
                });
              }}
              country=""
            />
          )}
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Col>
    </Container>
  );
}

export default Signup;
