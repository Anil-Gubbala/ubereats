import React, { useEffect, useState } from 'react';
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';
import Container from 'react-bootstrap/esm/Container';
import Figure from 'react-bootstrap/Figure';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import cookie from 'react-cookies';

import { Redirect } from 'react-router';
import { get, post } from '../utils/serverCall';
import Dishes from './Dishes';
import CONSTANTS, { REST_DELIVERY_MODE } from '../utils/consts';
import RedirectSignin from '../common/RedirectSignin';
import RedirectInvalid from '../common/RedirectInvalid';
import Location from '../account/Location';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { FloatingLabel, Form, Image } from 'react-bootstrap';
import FileUpload from '../common/FileUpload';

function RestaurantHome() {
  const appCookies = cookie.load(CONSTANTS.COOKIE);
  const isCustomer = appCookies && appCookies[CONSTANTS.COOKIE_KEY.ISCUSTOMER];
  if (!appCookies) {
    return <RedirectSignin />;
  }

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
    get('/restaurantInfo', { id: params.get('id') }).then((data) => {
      setRestaurantInfo((prev) => ({ ...prev, ...data[0] }));
    });
  }, []);

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

  const handleSave = () => {
    post('/updateRestaurantInfo', dialogData)
      .then(() => {
        setRestaurantInfo(dialogData);
        handleClose();
      })
      .catch(() => {});
  };

  const handleDialogChange = (e) => {
    setDialogData({ ...dialogData, [e.target.name]: e.target.value });
  };

  const updateRestDialog = (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Update Restaurant Info</DialogTitle>
      <DialogContent>
        <TextField
          margin='dense'
          id='rdname'
          name='name'
          label='Name'
          fullWidth
          variant='standard'
          value={dialogData.name}
          onChange={handleDialogChange}
        />
        <TextField
          margin='dense'
          id='rddescription'
          name='description'
          label='Description'
          fullWidth
          variant='standard'
          value={dialogData.description}
          onChange={handleDialogChange}
        />
        <TextField
          margin='dense'
          id='rdcontact'
          name='contact'
          label='Contact Information'
          fullWidth
          variant='standard'
          value={dialogData.contact}
          onChange={handleDialogChange}
        />
        <FloatingLabel controlId='start' label='Start Time' className='mb-3'>
          <Form.Control
            name='start'
            type='time'
            onChange={handleDialogChange}
            required
            value={dialogData.start}
          />
        </FloatingLabel>
        <FloatingLabel controlId='end' label='End Time' className='mb-3'>
          <Form.Control
            name='end'
            type='time'
            onChange={handleDialogChange}
            required
            value={dialogData.end}
          />
        </FloatingLabel>
        <Form.Select
          name='delivery'
          value={dialogData.delivery}
          onChange={handleDialogChange}
        >
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
        <Form.Group className='mb-3' controlId='nickname'>
          <Col xs={6} md={4}>
            <Image src={dialogData.picture} roundedCircle thumbnail='true' />
          </Col>
          <Col>
            <FileUpload
              onUpload={(e) => {
                setDialogData({ ...dialogData, picture: e });
              }}
              id={`${dialogData.email}-restaurantPic`}
            />
          </Col>
        </Form.Group>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSave}>Save</Button>
      </DialogActions>
    </Dialog>
  );
  return (
    <Container>
      <Row>
        <Card>
          <CardMedia
            component='img'
            height='140'
            image={restaurantInfo.picture}
            alt='green iguana'
          />
          <Row>
            <Col>
              <Stack spacing={2}>
                <Stack spacing={2} direction='row'>
                  <Typography gutterBottom variant='h5' component='div'>
                    {restaurantInfo.name}
                  </Typography>
                  <Typography
                    style={{ marginTop: 'auto', marginBottom: 'auto' }}
                    variant='body2'
                    color='text.secondary'
                  >
                    {restaurantInfo.start} - {restaurantInfo.end}
                  </Typography>
                </Stack>
                <Typography variant='body2' color='text.secondary'>
                  {restaurantInfo.location}
                </Typography>
                <Typography variant='subtitle2' gutterBottom component='div'>
                  {restaurantInfo.description}
                </Typography>
              </Stack>
            </Col>
            {!isCustomer && (
              <Col md='auto'>
                <Row style={{ padding: '8px' }}>
                  <Stack spacing={2}>
                    <Button onClick={handleClickOpen}>
                      Update Restaurant Info
                    </Button>
                    {updateRestDialog}
                  </Stack>
                </Row>
              </Col>
            )}
          </Row>
        </Card>
      </Row>
      <Row>
        <Dishes isCustomer={isCustomer}></Dishes>
      </Row>
    </Container>
  );
}

export default RestaurantHome;
