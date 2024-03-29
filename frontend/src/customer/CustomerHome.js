import React, { useEffect, useState } from 'react';
import { Container, FormControl, InputGroup, Button, Nav } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { useDispatch, useSelector } from 'react-redux';

import { get, post } from '../utils/serverCall';
import { apiActionCreators } from '../reducers/actionCreators';
import { bindActionCreators } from 'redux';

function CustomerHome() {
  const defaultValues = [];
  const [restaurantsInfo, setRestaurantsInfo] = useState(defaultValues);
  const [favorites, setFavorites] = useState([]);
  const homeFilterState = useSelector((state) => state.homeFilterReducer);
  const [search, setSearch] = useState('');
  const [tab, setTab] = useState(0);
  const dispatch = useDispatch();
  const { doGet, doPost } = bindActionCreators(apiActionCreators, dispatch);
  const getRestaurantsListApi = useSelector((state) => state.getRestaurantsListApi);
  const getFavoritesApi = useSelector((state) => state.getFavoritesApi);
  const addToFavoritesApi = useSelector((state) => state.addToFavoritesApi);
  const removeFromFavoritesApi = useSelector((state) => state.removeFromFavoritesApi);
  // const defaultFilter = {
  //   vegType: 0,
  //   delivery: 0,
  // };
  // const [filter, setFilter] = useState(defaultFilter);

  const getRestaurantList = (fav) => {
    doGet('/getRestaurantsList', {
      ...homeFilterState,
      search,
      favorite: fav,
    });
    // get('/getRestaruantsList', {
    //   ...homeFilterState,
    //   search,
    //   favorite: fav,
    // }).then((data) => {
    //   setRestaurantsInfo(() => data);
    // });
  };

  useEffect(() => {
    if (getRestaurantsListApi.status === 1) {
      if (getRestaurantsListApi.error === '') {
        setRestaurantsInfo(() => getRestaurantsListApi.response);
      }
    }
  }, [getRestaurantsListApi]);

  useEffect(() => {
    // setFilter(homeFilterState);
    getRestaurantList(tab);
    // or do direct db call here
  }, [homeFilterState, tab]);

  // useEffect(() => {
  //   get('/getRestaruantsList').then((data) => {
  //     setRestaurantsInfo(() => data);
  //   });
  // }, []);

  useEffect(() => {
    doGet('/getFavorites');
    // get('/getFavorites').then((data) => {
    //   const list = data.map((each) => each.restaurant_id);
    //   setFavorites(() => list);
    // });
  }, []);

  useEffect(() => {
    if (getFavoritesApi.status === 1) {
      if (getFavoritesApi.error === '') {
        const list = getFavoritesApi.response;
        setFavorites(() => list);
      }
    }
  }, [getFavoritesApi]);

  const addToFavorites = (e) => {
    const email = e.currentTarget.getAttribute('email');
    doPost('/addToFavorites', {
      email,
    });
    // post('/addToFavorites', {
    //   email,
    // })
    //   .then(() => {
    //     setFavorites((prev) => [...prev, email]);
    //   })
    //   .catch(() => {});
  };

  useEffect(() => {
    if (addToFavoritesApi.status === 1) {
      if (addToFavoritesApi.error === '') {
        setFavorites((prev) => [...prev, addToFavoritesApi.response.email]);
      }
    }
  }, [addToFavoritesApi]);

  const removeFromFavorites = (e) => {
    const email = e.currentTarget.getAttribute('email');
    doPost('/removeFromFavorites', {
      email,
    });
    // post('/removeFromFavorites', {
    //   email,
    // })
    //   .then(() => {
    //     setFavorites((prev) => {
    //       prev.splice(prev.indexOf(email), 1);
    //       return [...prev];
    //     });
    //   })
    //   .catch(() => {});
  };

  useEffect(() => {
    if (removeFromFavoritesApi.status === 1) {
      if (removeFromFavoritesApi.error === '') {
        setFavorites((prev) => {
          prev.splice(prev.indexOf(removeFromFavoritesApi.response.email), 1);
          return [...prev];
        });
      }
    }
  }, [removeFromFavoritesApi]);

  // if (restaurantsInfo.length === 0) {
  //   return (
  //     <Container>
  //       <Row>
  //         <Card style={{ width: '18rem', margin: 'auto' }}>
  //           <Card.Body>
  //             <Card.Title>No Restaurants Available</Card.Title>
  //           </Card.Body>
  //         </Card>
  //       </Row>
  //     </Container>
  //   );
  // }
  return (
    <Container>
      <Row>
        <Nav variant="tabs" defaultActiveKey="all">
          <Nav.Item>
            <Nav.Link
              eventKey="all"
              onClick={() => {
                setTab(0);
              }}
            >
              {' '}
              ALL{' '}
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              eventKey="favorite"
              onClick={() => {
                setTab(1);
              }}
            >
              Favorites
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </Row>
      <Row>
        <InputGroup className="mb-3" style={{ marginTop: '8px' }}>
          <FormControl
            placeholder="Search Restaurants"
            aria-label="Search Restaurants"
            aria-describedby="basic-addon2"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
          <Button
            variant="outline-secondary"
            id="button-addon2"
            onClick={() => {
              getRestaurantList(tab);
            }}
          >
            Search
          </Button>
        </InputGroup>
      </Row>
      {restaurantsInfo.length === 0 && (
        <Row>
          <Card style={{ width: '18rem', margin: 'auto' }}>
            <Card.Body>
              <Card.Title>No Restaurants Available</Card.Title>
            </Card.Body>
          </Card>
        </Row>
      )}
      <Row xs={1} md={3} className="g-4">
        {restaurantsInfo.map((each) => (
          <Col key={each.name}>
            <Card style={{ width: '18rem' }}>
              <Card.Img style={{ height: '140px' }} variant="top" src={each.picture} />
              <Card.Body>
                <Card.Title>{each.name}</Card.Title>
                <Card.Text>{each.description}</Card.Text>
                <Link to={`/restaurant?id=${each.email}`} className="pure-menu-link">
                  View Menu
                </Link>
                {favorites.indexOf(each.email) >= 0 ? (
                  <IconButton
                    aria-label="Remove Favorite"
                    email={each.email}
                    onClick={removeFromFavorites}
                  >
                    <StarIcon />
                  </IconButton>
                ) : (
                  <IconButton aria-label="Add Favorite" email={each.email} onClick={addToFavorites}>
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
