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

import { get } from '../utils/serverCall';
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
  const [info, setInfo] = useState(defaultValues);
  useEffect(() => {
    get('/restaurantInfo').then((data) => {
      setInfo((prev) => ({ ...prev, ...data[0] }));
    });
  }, []);
  return (
    <Container>
      <Row>
        <Card>
          <CardMedia
            component='img'
            height='140'
            image={info.picture}
            alt='green iguana'
          />
          <Row>
            <Col>
              <Stack spacing={2}>
                <Stack spacing={2} direction='row'>
                  <Typography gutterBottom variant='h5' component='div'>
                    {info.name}
                  </Typography>
                  <Typography
                    style={{ marginTop: 'auto', marginBottom: 'auto' }}
                    variant='body2'
                    color='text.secondary'
                  >
                    {info.start} - {info.end}
                  </Typography>
                </Stack>
                <Typography variant='body2' color='text.secondary'>
                  {info.location}
                </Typography>
                <Typography variant='subtitle2' gutterBottom component='div'>
                  {info.description}
                </Typography>
              </Stack>
            </Col>
            <Col md='auto'>
              <Row style={{ padding: '8px' }}>
                <Stack spacing={2}>
                  <Button>Update Restaurant Info</Button>
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
