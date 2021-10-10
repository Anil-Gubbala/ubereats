import React, { useEffect, useState } from 'react';
import { Container, FormControl, InputGroup, Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { useSelector } from 'react-redux';

import { get, post } from '../utils/serverCall';

function CustomerHome() {
  const defaultValues = [];
  const [restaurantsInfo, setRestaurantsInfo] = useState(defaultValues);
  const [favorites, setFavorites] = useState([]);
  const homeFilterState = useSelector((state) => state.homeFilterReducer);
  const [search, setSearch] = useState('');

  // const defaultFilter = {
  //   vegType: 0,
  //   delivery: 0,
  // };
  // const [filter, setFilter] = useState(defaultFilter);

  const getRestaurantList = () => {
    get('/getRestaruantsList', { ...homeFilterState, search }).then((data) => {
      setRestaurantsInfo(() => data);
    });
  };

  useEffect(() => {
    // setFilter(homeFilterState);
    getRestaurantList();
    // or do direct db call here
  }, [homeFilterState]);

  // useEffect(() => {
  //   get('/getRestaruantsList').then((data) => {
  //     setRestaurantsInfo(() => data);
  //   });
  // }, []);

  useEffect(() => {
    get('/getFavorites').then((data) => {
      const list = data.map((each) => each.restaurant_id);
      setFavorites(() => list);
    });
  }, []);

  const addToFavorites = (e) => {
    const email = e.currentTarget.getAttribute('email');
    post('/addToFavorites', {
      email,
    })
      .then(() => {
        setFavorites((prev) => [...prev, email]);
      })
      .catch(() => {});
  };

  const removeFromFavorites = (e) => {
    const email = e.currentTarget.getAttribute('email');
    post('/removeFromFavorites', {
      email,
    })
      .then(() => {
        setFavorites((prev) => {
          prev.splice(prev.indexOf(email), 1);
          return [...prev];
        });
      })
      .catch(() => {});
  };

  if (restaurantsInfo.length === 0) {
    return (
      <Container>
        <Row>
          <Card style={{ width: '18rem', margin: 'auto' }}>
            <Card.Body>
              <Card.Title>No Restaurants Available</Card.Title>
            </Card.Body>
          </Card>
        </Row>
      </Container>
    );
  }
  return (
    <Container>
      <Row>
        <InputGroup className='mb-3' style={{ marginTop: '8px' }}>
          <FormControl
            placeholder='Search Restaurants'
            aria-label='Search Restaurants'
            aria-describedby='basic-addon2'
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
          <Button
            variant='outline-secondary'
            id='button-addon2'
            onClick={() => {
              getRestaurantList();
            }}
          >
            Search
          </Button>
        </InputGroup>
      </Row>
      <Row xs={1} md={3} className='g-4'>
        {restaurantsInfo.map((each) => (
          <Col key={each.name}>
            <Card style={{ width: '18rem' }}>
              <Card.Img
                style={{ height: '140px' }}
                variant='top'
                src={each.picture}
              />
              <Card.Body>
                <Card.Title>{each.name}</Card.Title>
                <Card.Text>{each.description}</Card.Text>
                <Link
                  to={`/restaurant?id=${each.email}`}
                  className='pure-menu-link'
                >
                  View Menu
                </Link>
                {favorites.indexOf(each.email) >= 0 ? (
                  <IconButton
                    aria-label='Remove Favorite'
                    email={each.email}
                    onClick={removeFromFavorites}
                  >
                    <StarIcon />
                  </IconButton>
                ) : (
                  <IconButton
                    aria-label='Add Favorite'
                    email={each.email}
                    onClick={addToFavorites}
                  >
                    <StarBorderIcon />
                  </IconButton>
                )}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default CustomerHome;
