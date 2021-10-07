import React, { useEffect, useState } from 'react';
import Col from 'react-bootstrap/esm/Col';
import Container from 'react-bootstrap/esm/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Image from 'react-bootstrap/Image';
import cookie from 'react-cookies';

import { Row } from 'react-bootstrap';
import { Redirect } from 'react-router';
import CONSTANTS from '../utils/consts';
import { get, post } from '../utils/serverCall';
import FileUpload from '../common/FileUpload';

function Profile() {
  const status = localStorage.getItem(CONSTANTS.STATUS);
  const cookieData = cookie.load(CONSTANTS.COOKIE);
  const windowUrl = window.location.search;
  const params = new URLSearchParams(windowUrl);
  let email = '';
  const [editMode, setEditMode] = useState(status === '0');
  // const [viewMode, setViewMode] = useState(true);

  if (cookieData.customer) {
    if (params.get('id')) {
      return <Redirect to='/profile'></Redirect>;
    }
  } else {
    email = params.get('id');
  }

  const defaultFormData = {
    contact: '',
    dob: '',
    email: '',
    location: '',
    name: '',
    nickname: '',
    picture: '',
    about: '',
  };
  const [formData, setFormData] = useState(defaultFormData);

  useEffect(() => {
    get('/getUserProfile', {
      email,
    }).then((response) => {
      const data = response[0];
      setFormData((prev) => ({ ...prev, ...data }));
    });
  }, []);

  const eventHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    post('/updateUserInfo', formData).then(() => {
      setEditMode(false);
      // setViewMode(true);
      localStorage.removeItem(CONSTANTS.STATUS);
    });
  };

  const editProfile = () => {
    setEditMode(true);
  };

  if (editMode) {
    return (
      <Container>
        <Col>
          <Form onSubmit={handleUpdateProfile}>
            <FloatingLabel
              controlId='email'
              label='Email Address'
              className='mb-3'
            >
              <Form.Control
                name='email'
                onChange={eventHandler}
                type='email'
                required
                value={formData.email}
              />
            </FloatingLabel>
            <FloatingLabel controlId='name' label='Name' className='mb-3'>
              <Form.Control
                name='name'
                type='input'
                onChange={eventHandler}
                required
                value={formData.name}
              />
            </FloatingLabel>
            <FloatingLabel
              controlId='dob'
              label='Date of Birth'
              className='mb-3'
            >
              <Form.Control
                name='dob'
                type='date'
                onChange={eventHandler}
                required
                value={formData.dob}
              />
            </FloatingLabel>
            <FloatingLabel
              controlId='nickname'
              label='Nickname'
              className='mb-3'
            >
              <Form.Control
                name='nickname'
                type='input'
                onChange={eventHandler}
                required
                value={formData.nickname}
              />
            </FloatingLabel>
            <FloatingLabel controlId='about' label='About' className='mb-3'>
              <Form.Control
                as='textarea'
                name='about'
                onChange={eventHandler}
                required
                value={formData.about}
              />
            </FloatingLabel>
            <FloatingLabel controlId='contact' label='Phone' className='mb-3'>
              <Form.Control
                name='contact'
                type='input'
                onChange={eventHandler}
                required
                value={formData.contact}
              />
            </FloatingLabel>
            <Form.Group className='mb-3' controlId='nickname'>
              <Col xs={6} md={4}>
                <Image
                  src='https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg'
                  roundedCircle
                  thumbnail='true'
                />
              </Col>
              <Col>
                <FileUpload></FileUpload>
              </Col>
            </Form.Group>

            <Button variant='primary' type='submit'>
              Submit
            </Button>
          </Form>
        </Col>
      </Container>
    );
  }
  // if (viewMode && status !== '0')
  return (
    <Container>
      <Row>
        <Col xs={6} md={4}>
          <Image
            src='https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg'
            roundedCircle
            thumbnail='true'
          />
        </Col>
        <Col>
          <Row>
            <Col>Name:</Col>
            <Col>{formData.name}</Col>
          </Row>
          <Row>
            <Col>Nickname:</Col>
            <Col>{formData.nickname}</Col>
          </Row>
          <Row>
            <Col>Date Of Birth:</Col>
            <Col>{formData.dob}</Col>
          </Row>
          <Row>
            <Col>Contact:</Col>
            <Col>{formData.contact}</Col>
          </Row>
          <Row>
            <Col>Email:</Col>
            <Col>{formData.email}</Col>
          </Row>
          <Row>
            <Col>About:</Col>
            <Col>{formData.about}</Col>
          </Row>
          <Row>
            <Button variant='primary' type='button' onClick={editProfile}>
              Edit
            </Button>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default Profile;
