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

import { get, post } from '../utils/serverCall';
import Dishes from './Dishes';

function RestaurantHome() {
  const defaultValues = {
    contact: '',
    description: 'Add description',
    end: '16:00:00',
    location: 'Add restaurant location',
    name: '',
    picture: 'Add Restaurant Image',
    start: '16:00:00',
  };

  const [restaurantInfo, setRestaurantInfo] = useState(defaultValues);
  useEffect(() => {
    get('/restaurantInfo').then((data) => {
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
            <Col md='auto'>
              <Row style={{ padding: '8px' }}>
                <Stack spacing={2}>
                  <Button onClick={handleClickOpen}>
                    Update Restaurant Info
                  </Button>
                  <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Subscribe</DialogTitle>
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
                      <TextField
                        margin='dense'
                        id='rdstart'
                        name='start'
                        label='Start time'
                        fullWidth
                        variant='standard'
                        value={dialogData.start}
                        onChange={handleDialogChange}
                      />
                      <TextField
                        margin='dense'
                        id='rdend'
                        name='end'
                        label='End time'
                        fullWidth
                        variant='standard'
                        value={dialogData.end}
                        onChange={handleDialogChange}
                      />
                      <TextField
                        margin='dense'
                        id='rdlocation'
                        name='location'
                        label='Location'
                        fullWidth
                        variant='standard'
                        value={dialogData.location}
                        onChange={handleDialogChange}
                      />
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleClose}>Cancel</Button>
                      <Button onClick={handleSave}>Save</Button>
                    </DialogActions>
                  </Dialog>
                </Stack>
              </Row>
            </Col>
          </Row>
        </Card>
      </Row>
      <Row>
        <Dishes></Dishes>
      </Row>
    </Container>
  );
}

export default RestaurantHome;
