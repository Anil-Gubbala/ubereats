import React, { useEffect, useState } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import cookie from 'react-cookies';

import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { FloatingLabel, Form, Image } from 'react-bootstrap';
import { get, post } from '../utils/serverCall';
import Dishes from './Dishes';
import CONSTANTS, { REST_DELIVERY_MODE } from '../utils/consts';
import RedirectSignin from '../common/RedirectSignin';
import Location from '../account/Location';
import FileUpload from '../common/FileUpload';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { apiActionCreators } from '../reducers/actionCreators';

function RestaurantHome() {
  const appCookies = cookie.load(CONSTANTS.COOKIE);
  const isCustomer = JSON.parse(localStorage.getItem(CONSTANTS.IS_CUSTOMER));
  const jwtToken = localStorage.getItem(CONSTANTS.TOKEN);
  if (!jwtToken) {
    return <RedirectSignin></RedirectSignin>;
  }
  // if (!appCookies) {
  //   return <RedirectSignin />;
  // }

  const dispatch = useDispatch();
  const { doGet, doPost } = bindActionCreators(apiActionCreators, dispatch);
  const getRestaurantInfoApi = useSelector((state) => state.getRestaurantInfoApi);
  const updateRestaurantInfoApi = useSelector((state) => state.updateRestaurantInfoApi);

  const windowUrl = window.location.search;
  const params = new URLSearchParams(windowUrl);

  const defaultValues = {
    contact: '',
    description: 'Add description',
    end: '16:00:00',
    location: 'Add restaurant location',
    name: '',
    picture: '',
    start: '16:00:00',
    email: params.get('id'),
    latitude: '',
    longitude: '',
    delivery: 0,
  };

  const [restaurantInfo, setRestaurantInfo] = useState(defaultValues);
  useEffect(() => {
    doGet('/getRestaurantInfo', { id: params.get('id') });
    // get('/restaurantInfo', { id: params.get('id') }).then((data) => {
    //   setRestaurantInfo((prev) => ({ ...prev, ...data[0] }));
    // });
  }, []);

  useEffect(() => {
    if (getRestaurantInfoApi.status === 1) {
      if (getRestaurantInfoApi.error === '') {
        setRestaurantInfo((prev) => ({ ...prev, ...getRestaurantInfoApi.response }));
      }
    }
  }, [getRestaurantInfoApi]);

  const [open, setOpen] = React.useState(false);
  const [dialogData, setDialogData] = useState(restaurantInfo);

  const handleClickOpen = () => {
    setDialogData(restaurantInfo);
    setOpen(true);
  };

  const handleClose = () => {
    // setDialogData(restaurantInfo);
    setOpen(false);
  };

  const handleSave = (e) => {
    e.preventDefault();
    doPost('/updateRestaurantInfo', dialogData);
    // post('/updateRestaurantInfo', dialogData)
    //   .then(() => {
    //     setRestaurantInfo(dialogData);
    //     handleClose();
    //   })
    //   .catch(() => {});
  };

  useEffect(() => {
    if (updateRestaurantInfoApi.status === 1) {
      if (updateRestaurantInfoApi.error === '') {
        setRestaurantInfo(dialogData);
        handleClose();
      }
    }
  }, [updateRestaurantInfoApi]);

  const handleDialogChange = (e) => {
    setDialogData({ ...dialogData, [e.target.name]: e.target.value });
  };

  const updateRestDialog = (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Update Restaurant Info</DialogTitle>
      <DialogContent>
        <Form id="updateRestaurantForm" onSubmit={handleSave}>
          <FloatingLabel controlId="rdname" label="Name" className="mb-3">
            <Form.Control
              name="name"
              type="input"
              onChange={handleDialogChange}
              required
              value={dialogData.name}
            />
          </FloatingLabel>
          <FloatingLabel controlId="rdddescription" label="Description" className="mb-3">
            <Form.Control
              name="description"
              type="input"
              onChange={handleDialogChange}
              required
              value={dialogData.description}
            />
          </FloatingLabel>
          <FloatingLabel controlId="rdcontact" label="Contact Information" className="mb-3">
            <Form.Control
              name="contact"
              type="number"
              min="1000000000"
              max="9999999999"
              onInvalid={(e) => {
                e.target.setCustomValidity('Enter valid number');
              }}
              onInput={(e) => {
                e.target.setCustomValidity('');
              }}
              onChange={(e) => {
                e.target.setCustomValidity('');
                handleDialogChange(e);
              }}
              required
              value={dialogData.contact}
            />
          </FloatingLabel>

          <FloatingLabel controlId="start" label="Start Time" className="mb-3">
            <Form.Control
              name="start"
              type="time"
              onChange={handleDialogChange}
              required
              value={dialogData.start}
            />
          </FloatingLabel>
          <FloatingLabel controlId="end" label="End Time" className="mb-3">
            <Form.Control
              name="end"
              type="time"
              onChange={handleDialogChange}
              required
              value={dialogData.end}
            />
          </FloatingLabel>
          <Form.Select name="delivery" value={dialogData.delivery} onChange={handleDialogChange}>
            {Object.keys(REST_DELIVERY_MODE).map((key) => (
              <option key={key} value={key}>
                {REST_DELIVERY_MODE[key]}
              </option>
            ))}
          </Form.Select>

          <Location
            value={dialogData.location}
            change={(e) => {
              setDialogData((prev) => ({ ...prev, location: e }));
            }}
            select={(e) => {
              geocodeByAddress(e).then((results) => {
                setDialogData((prev) => ({
                  ...prev,
                  location: e,
                }));
                getLatLng(results[0])
                  .then(({ lat, lng }) => {
                    setDialogData((prev) => ({
                      ...prev,
                      latitude: lat,
                      longitude: lng,
                    }));
                  })
                  .catch((error) => console.log(error));
              });
            }}
          />
          <Form.Group className="mb-3" controlId="nickname">
            <Col xs={6} md={4}>
              <Image src={dialogData.picture} roundedCircle thumbnail="true" />
            </Col>
            <Col>
              <FileUpload
                onUpload={(e) => {
                  setDialogData({ ...dialogData, picture: e });
                }}
                id={`${new Date().valueOf() + dialogData.email}restaurantPic`}
              />
            </Col>
          </Form.Group>
        </Form>
      </DialogContent>
      <DialogActions>
        <Button type="submit" onClick={handleClose}>
          Cancel
        </Button>
        <Button form="updateRestaurantForm" type="submit">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
  return (
    <Container>
      <Row>
        <Card>
          <CardMedia
            component="img"
            height="140"
            image={restaurantInfo.picture}
            alt="green iguana"
          />
          <Row>
            <Col>
              <Stack spacing={2}>
                <Stack spacing={2} direction="row">
                  <Typography gutterBottom variant="h5" component="div">
                    {restaurantInfo.name}
                  </Typography>
                  <Typography
                    style={{ marginTop: 'auto', marginBottom: 'auto' }}
                    variant="body2"
                    color="text.secondary"
                  >
                    {restaurantInfo.start} - {restaurantInfo.end}
                  </Typography>
                </Stack>
                <Typography variant="body2" color="text.secondary">
                  {restaurantInfo.location}
                </Typography>
                <Typography variant="subtitle2" gutterBottom component="div">
                  {restaurantInfo.description}
                </Typography>
              </Stack>
            </Col>
            {!isCustomer && (
              <Col md="auto">
                <Row style={{ padding: '8px' }}>
                  <Stack spacing={2}>
                    <Button onClick={handleClickOpen}>Update Restaurant Info</Button>
                    {updateRestDialog}
                  </Stack>
                </Row>
              </Col>
            )}
          </Row>
        </Card>
      </Row>
      <Row>
        <Dishes isCustomer={isCustomer} />
      </Row>
    </Container>
  );
}

export default RestaurantHome;
