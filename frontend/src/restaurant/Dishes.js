import React, { useState, useEffect } from 'react';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import Stack from '@mui/material/Stack';
import Image from 'react-bootstrap/Image';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

import { Container } from '@mui/material';
import Grid from '@mui/material/Grid';
import propTypes from 'prop-types';

import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';

import { actionCreators, apiActionCreators } from '../reducers/actionCreators';

import { get, post } from '../utils/serverCall';
import { restaurant } from '../reducers/actions';
import { Col, Form, InputGroup } from 'react-bootstrap';
import FileUpload from '../common/FileUpload';
import { DISH_CATEGORY, VEG } from '../utils/consts';

export default function Dishes(props) {
  const dispatch = useDispatch();
  const { addItem } = bindActionCreators(actionCreators, dispatch);
  const windowUrl = window.location.search;
  const params = new URLSearchParams(windowUrl);
  const [open, setOpen] = useState(false);
  const [dishes, setDishes] = useState([]);
  const [updateMode, setUpdateMode] = useState(false);
  const [updateIndex, setUpdateIndex] = useState(0);
  const homeFilterState = useSelector((state) => state.homeFilterReducer);
  const { doGet, doPost } = bindActionCreators(apiActionCreators, dispatch);
  const getDishesApi = useSelector((state) => state.getDishesApi);
  const updateDishApi = useSelector((state) => state.updateDishApi);
  const createDishApi = useSelector((state) => state.createDishApi);
  const deleteDishApi = useSelector((state) => state.deleteDishApi);
  const dialogDefault = {
    name: '',
    ingredients: '',
    picture: '',
    price: '',
    description: '',
    category: '0',
    type: '0',
  };

  let deleteDishIndex = 0;

  const defaultCart = { restaurantId: '', dishes: {} };
  const [cart, setCart] = useState(defaultCart);
  const [dialogData, setDialogData] = useState(dialogDefault);
  const handleDialogChange = (e) => {
    setDialogData({ ...dialogData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    doGet('/getDishes', {
      id: params.get('id'),
      type: homeFilterState.vegType,
    });
    // get('/getDishes', {
    //   id: params.get('id'),
    //   type: homeFilterState.vegType,
    // }).then((response) => {
    //   // const result = new Map(response.map((i) => [i.name, i]));
    //   setDishes(() => response);
    // });
  }, [homeFilterState]);

  useEffect(() => {
    if (getDishesApi.status === 1) {
      if (getDishesApi.error === '') {
        setDishes(() => getDishesApi.response);
      }
    }
  }, [getDishesApi]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const closeDialog = () => {
    if (updateMode) {
      setUpdateMode(false);
    }
    setDialogData(dialogDefault);
    setOpen(false);
  };

  const createDish = (e) => {
    e.preventDefault();
    if (updateMode) {
      doPost('/updateDish', {
        ...dialogData,
        originalName: dishes[updateIndex].name,
      });
      // post('/updateDish', {
      //   ...dialogData,
      //   originalName: dishes[updateIndex].name,
      // })
      //   .then(() => {
      //     setDishes((prev) => {
      //       const updated = [...prev];
      //       updated[updateIndex] = dialogData;
      //       return updated;
      //     });
      //     closeDialog();
      //   })
      //   .catch(() => {});
    } else {
      doPost('/createDish', dialogData);
      // post('/createDish', dialogData)
      //   .then(() => {
      //     setDishes((prev) => [...prev, dialogData]);
      //     closeDialog();
      //   })
      //   .catch(() => {});
    }
  };

  useEffect(() => {
    if (updateDishApi.status === 1) {
      if (updateDishApi.error === '') {
        setDishes((prev) => {
          const updated = [...prev];
          updated[updateIndex] = dialogData;
          return updated;
        });
        closeDialog();
      }
    }
  }, [updateDishApi]);

  useEffect(() => {
    if (createDishApi.status === 1) {
      if (createDishApi.error === '') {
        setDishes((prev) => [...prev, dialogData]);
        closeDialog();
      }
    }
  }, [createDishApi]);

  const handleClose = () => {
    closeDialog();
  };

  const handleDishEdit = (e) => {
    setUpdateMode(true);
    setDialogData(dishes[e.target.getAttribute('index')]);
    setUpdateIndex(e.target.getAttribute('index'));
    setOpen(true);
  };

  const addToCart = (e) => {
    const restaurantId = params.get('id');
    const dish = e.target.getAttribute('dish');
    const price = e.target.getAttribute('price');
    addItem({ restaurantId, dish, price });
  };

  const deleteDish = (e) => {
    deleteDishIndex = e.target.getAttribute('index');
    doPost('/deleteDish', { name: dishes[deleteDishIndex].name });
    // post('/deleteDish', { name: dishes[index].name })
    //   .then(() => {
    //     setDishes((prev) => {
    //       prev.splice(parseInt(index, 10), 1);
    //       return [...prev];
    //     });
    //   })
    //   .catch(() => {});
  };

  useEffect(() => {
    if (deleteDishApi.status === 1) {
      if (deleteDishApi.error === '') {
        setDishes((prev) => {
          prev.splice(parseInt(deleteDishIndex, 10), 1);
          return [...prev];
        });
      }
    }
  }, [deleteDishApi]);

  const addDishDialog = (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add Dish</DialogTitle>
      <DialogContent>
        <Form id="createDishForm" onSubmit={createDish}>
          <Stack>
            <FloatingLabel controlId="dialogName" label="Dish Name" className="mb-3">
              <Form.Control
                name="name"
                type="input"
                onChange={handleDialogChange}
                required
                value={dialogData.name}
              />
            </FloatingLabel>
            <FloatingLabel controlId="ingredients" label="Ingredients" className="mb-3">
              <Form.Control
                name="ingredients"
                type="input"
                onChange={handleDialogChange}
                required
                value={dialogData.ingredients}
              />
            </FloatingLabel>
            <FloatingLabel controlId="dialogAmount" label="Price in $" className="mb-3">
              <Form.Control
                name="price"
                onChange={handleDialogChange}
                required
                type="number"
                step="0.01"
                value={dialogData.price}
              />
            </FloatingLabel>

            <FloatingLabel controlId="description" label="Description" className="mb-3">
              <Form.Control
                name="description"
                type="input"
                onChange={handleDialogChange}
                required
                value={dialogData.description}
              />
            </FloatingLabel>

            <br />
            <FloatingLabel controlId="floatingSelect" label="Dish Category">
              <Form.Select
                aria-label="Category"
                value={dialogData.category}
                onChange={handleDialogChange}
                name="category"
                required
              >
                {Object.keys(DISH_CATEGORY).map((key) => (
                  <option key={key} value={key}>
                    {DISH_CATEGORY[key]}
                  </option>
                ))}
              </Form.Select>
            </FloatingLabel>
            <br />
            <FloatingLabel controlId="floatingSelect" label="Dish Type">
              <Form.Select
                aria-label="type"
                value={dialogData.type}
                onChange={handleDialogChange}
                name="type"
              >
                {Object.keys(VEG).map((key) => (
                  <option key={key} value={key}>
                    {VEG[key]}
                  </option>
                ))}
              </Form.Select>
            </FloatingLabel>
          </Stack>
          <Stack alignItems="center" spacing={2}>
            <Form.Group className="mb-3" controlId="nickname">
              <Col xs={6} md={4}>
                <Image src={dialogData.picture} roundedCircle thumbnail="true" />
              </Col>
              <Col>
                <FileUpload
                  onUpload={(e) => {
                    setDialogData({ ...dialogData, picture: e });
                  }}
                  id={`${new Date().valueOf() + params.get('id') + dialogData.name}`}
                />
              </Col>
            </Form.Group>
          </Stack>
        </Form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
        <Button type="submit" form="createDishForm">
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );

  return (
    <Container style={{ marginTop: '16px' }}>
      {!props.isCustomer && (
        <Button variant="outlined" onClick={handleClickOpen}>
          Add Dishes
        </Button>
      )}
      {!props.isCustomer && addDishDialog}

      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
        style={{ marginTop: '16px' }}
      >
        {dishes.map((each, index) => (
          <Grid item xs={2} sm={4} md={4} key={each.name}>
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia component="img" height="140" image={each.picture} alt="green iguana" />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {each.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {each.description}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {`$${each.price}`}
                </Typography>
              </CardContent>
              {!props.isCustomer && (
                <CardActions>
                  <Button size="small" index={index} onClick={handleDishEdit}>
                    Edit
                  </Button>
                  <Button size="small" index={index} onClick={deleteDish}>
                    Delete
                  </Button>
                </CardActions>
              )}
              {props.isCustomer && (
                <CardActions>
                  <Button
                    dish={each.name}
                    price={each.price}
                    size="small"
                    index={index}
                    onClick={addToCart}
                  >
                    Add to cart
                  </Button>
                </CardActions>
              )}
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

Dishes.propTypes = {
  isCustomer: propTypes.bool.isRequired,
};
