import React, { useEffect, useState } from 'react';
import {
  Card,
  Container,
  FloatingLabel,
  Form,
  Row,
  Table,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { post, get } from '../utils/serverCall';
import CountriesList from '../utils/CountriesList';
import Location from '../account/Location';
import { actionCreators } from '../reducers/actionCreators';
import { bindActionCreators } from 'redux';

function PlaceOrder() {
  const cartState = useSelector((state) => state.cartReducer);
  const [totalCost, setTotalCost] = useState(0);
  const [status, setStatus] = useState(0); // 0- not placed, 1- order placed.
  const [deliveryType, setDeliveryType] = useState(0);
  const [restDelivery, setRestDelivery] = useState(0);

  const dispatch = useDispatch();
  const { clearCart } = bindActionCreators(actionCreators, dispatch);

  useEffect(() => {
    if (cartState.restaurantId) {
      get('/getRestaurantDelivery', { email: cartState.restaurantId }).then(
        (result) => {
          setRestDelivery(result[0].delivery);
          if (deliveryType === 0 && result[0].delivery === 1) {
            setDeliveryType(result[0].delivery);
          }
        }
      );
    }
    setTotalCost(0);
    Object.keys(cartState.dishes).forEach((key) => {
      setTotalCost((prev) => {
        let total = prev + cartState.dishes[key][0] * cartState.dishes[key][1];
        total = parseFloat(total).toFixed(2);
        return total;
      });
    });
  }, [cartState]);

  const [addresses, setAddresses] = useState([]);
  const [deliveryAddress, setDeliveryAddress] = useState();

  useEffect(() => {
    get('/getAllAddresses').then((result) => {
      setDeliveryAddress(result[0].id);
      setAddresses(result);
    });
  }, []);

  const handlePlaceOrder = () => {
    post('/placeOrder', {
      restaurantId: cartState.restaurantId,
      addressId: deliveryAddress,
      delivery: deliveryType,
    })
      .then(() => {
        clearCart();
        setStatus(1);
      })
      .catch(() => {});
  };

  const defaultDialogData = {
    location: '',
    country: 'US',
    latitude: '',
    longitude: '',
  };
  const [dialogData, setDialogData] = useState(defaultDialogData);
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setDialogData(defaultDialogData);
    setShow(false);
  };
  const handleShow = () => setShow(true);
  const addNewAddress = () => {
    post('/addNewAddress', { ...dialogData }).then((result) => {
      setAddresses((prev) => [...prev, { id: result.insertId, ...dialogData }]);
      console.log(result);
      handleClose();
    });
  };
  const eventHandler = (e) => {
    setDialogData({ ...dialogData, [e.target.name]: e.target.value });
  };

  const addressDialog = (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Address</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <FloatingLabel controlId='country' label='Country' className='mb-3'>
          <CountriesList
            name='country'
            value={dialogData.country}
            onChange={eventHandler}
          />
          <Location
            value={dialogData.location}
            change={(e) => {
              setDialogData((prev) => ({ ...prev, location: e }));
            }}
            select={(e) => {
              setDialogData((prev) => ({ ...prev, location: e }));
              geocodeByAddress(e)
                .then((results) => getLatLng(results[0]))
                .then(({ lat, lng }) => {
                  setDialogData((prev) => ({
                    ...prev,
                    latitude: lat,
                    longitude: lng,
                  }));
                });
            }}
            country={dialogData.country}
          />
        </FloatingLabel>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={handleClose}>
          Close
        </Button>
        <Button variant='primary' onClick={addNewAddress}>
          Add
        </Button>
      </Modal.Footer>
    </Modal>
  );

  if (status === 1) {
    return (
      <Container>
        <Row>
          <Card style={{ width: '18rem', margin: 'auto' }}>
            <Card.Body>
              <Card.Title>Placed Order succesfully</Card.Title>
              <Link to='/myOrders' className='nav-link'>
                Go to my orders page
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
      <Row>{`Restaurant ID: ${cartState.restaurantId}`}</Row>
      <Row>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Dish Name</th>
              <th>Count</th>
              <th>Price</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(cartState.dishes).map((key) => (
              <tr key={key}>
                <td>{key}</td>
                <td>{cartState.dishes[key][0]}</td>
                <td>{`$${cartState.dishes[key][1]}`}</td>
                <td>
                  {`$${cartState.dishes[key][0] * cartState.dishes[key][1]}`}
                </td>
              </tr>
            ))}
            <tr>
              <td>Bill Amount</td>
              <td>{}</td>
              <td>{}</td>
              <td>{`$${totalCost}`}</td>
            </tr>
          </tbody>
        </Table>
      </Row>
      <Row>
        <FloatingLabel
          style={{ marginTop: '8px' }}
          controlId='floatingSelect'
          label='Delivery Type'
        >
          <Form.Select
            aria-label='deliveryType'
            value={deliveryType}
            onChange={(e) => {
              setDeliveryType(parseInt(e.target.value, 10));
              console.log(deliveryType);
            }}
            name='deliveryType'
          >
            {restDelivery === 0 && <option value='0'>Home Delivery</option>}
            <option value='1'>Pickup</option>
          </Form.Select>
        </FloatingLabel>
        {deliveryType === 0 && (
          <FloatingLabel
            style={{ marginTop: '8px' }}
            controlId='floatingSelect'
            label='Select Address'
          >
            <Form.Select
              aria-label='deliveryAddress'
              value={deliveryAddress}
              onChange={(e) => {
                setDeliveryAddress(e.target.value);
              }}
              name='deliveryAddress'
            >
              {addresses.map((each) => (
                <option key={each.id} value={each.id}>
                  {each.location}
                </option>
              ))}
            </Form.Select>
          </FloatingLabel>
        )}
        <br />
        <Row style={{ marginTop: '8px' }}>
          <Button variant='dark' onClick={handleShow}>
            Add New Address
          </Button>
        </Row>
      </Row>
      <Row style={{ marginTop: '8px' }}>
        <Button variant='dark' onClick={handlePlaceOrder}>
          Place Order
        </Button>
      </Row>
      {addressDialog}
    </Container>
  );
}

export default PlaceOrder;
