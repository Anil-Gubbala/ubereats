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

import { Container } from '@mui/material';
import Grid from '@mui/material/Grid';
import propTypes from 'prop-types';

import { get, post } from '../utils/serverCall';

export default function Dishes(props) {
  const windowUrl = window.location.search;
  const params = new URLSearchParams(windowUrl);
  const [open, setOpen] = useState(false);
  const [dishes, setDishes] = useState([]);
  const [updateMode, setUpdateMode] = useState(false);
  const [updateIndex, setUpdateIndex] = useState(0);
  const dialogDefault = {
    name: '',
    ingredients: '',
    image:
      'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg',
    price: '',
    description: '',
    category: '',
  };
  const [dialogData, setDialogData] = useState(dialogDefault);
  const handleDialogChange = (e) => {
    setDialogData({ ...dialogData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    get('/getDishes', { id: params.get('id') }).then((response) => {
      // const result = new Map(response.map((i) => [i.name, i]));
      setDishes(() => response);
    });
  }, []);

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

  const addDish = () => {
    if (updateMode) {
      post('/updateDish', {
        ...dialogData,
        originalName: dishes[updateIndex].name,
      })
        .then(() => {
          setDishes((prev) => {
            const updated = [...prev];
            updated[updateIndex] = dialogData;
            return updated;
          });
          closeDialog();
        })
        .catch(() => {});
    } else {
      post('/addDish', dialogData)
        .then(() => {
          setDishes((prev) => [...prev, dialogData]);
          closeDialog();
        })
        .catch(() => {});
    }
  };
  const handleClose = () => {
    closeDialog();
  };

  const handleDishEdit = (e) => {
    setUpdateMode(true);
    setDialogData(dishes[e.target.getAttribute('index')]);
    setUpdateIndex(e.target.getAttribute('index'));
    setOpen(true);
  };

  return (
    <Container>
      {!props.isCustomer && (
        <Button variant='outlined' onClick={handleClickOpen}>
          Add Dishes
        </Button>
      )}
      {!props.isCustomer && (
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Add Dish</DialogTitle>
          <DialogContent>
            <Stack>
              <TextField
                id='dialogName'
                name='name'
                label='Dish Name'
                variant='standard'
                value={dialogData.name}
                onChange={handleDialogChange}
              />
              <TextField
                id='dialogIngredients'
                name='ingredients'
                label='Ingredients'
                variant='standard'
                value={dialogData.ingredients}
                onChange={handleDialogChange}
              />

              <InputLabel htmlFor='dialogAmount'>Price</InputLabel>
              <Input
                id='dialogAmount'
                name='price'
                startAdornment={
                  <InputAdornment position='start'>$</InputAdornment>
                }
                value={dialogData.price}
                onChange={handleDialogChange}
              />
              <TextField
                id='dialogDescription'
                name='description'
                label='Description'
                variant='standard'
                value={dialogData.description}
                onChange={handleDialogChange}
              />
              <TextField
                id='dialogCategory'
                name='category'
                label='Category'
                variant='standard'
                value={dialogData.category}
                onChange={handleDialogChange}
              />
            </Stack>

            <Stack alignItems='center' spacing={2}>
              <Image
                src='https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg'
                rounded
                fluid
              />
              <label htmlFor='dialogImage'>
                <Input
                  style={{ display: 'none' }}
                  accept='image/*'
                  id='dialogImage'
                  multiple
                  type='file'
                />
                <Button variant='contained' component='span'>
                  Upload
                </Button>
              </label>
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Close</Button>
            <Button onClick={addDish}>Confirm</Button>
          </DialogActions>
        </Dialog>
      )}

      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {dishes.map((each, index) => (
          <Grid item xs={2} sm={4} md={4} key={each.name}>
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia
                component='img'
                height='140'
                image={each.image}
                alt='green iguana'
              />
              <CardContent>
                <Typography gutterBottom variant='h5' component='div'>
                  {each.name}
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                  {each.description}
                </Typography>
              </CardContent>
              {!props.isCustomer && (
                <CardActions>
                  <Button size='small' index={index} onClick={handleDishEdit}>
                    Edit
                  </Button>
                  <Button size='small'>Delete</Button>
                </CardActions>
              )}
              {props.isCustomer && (
                <CardActions>
                  <Button size='small' index={index} onClick={handleDishEdit}>
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
