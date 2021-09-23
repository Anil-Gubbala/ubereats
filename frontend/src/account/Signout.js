import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/esm/Container';
import { Redirect } from 'react-router';
import cookie from 'react-cookies';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';

import { get } from '../utils/serverCall';
import { COOKIE } from '../utils/consts';
import { actionCreators } from '../reducers/actionCreators';

function Signout() {
  const dispatch = useDispatch();
  const { signout } = bindActionCreators(actionCreators, dispatch);
  const [logout, setLogout] = useState(false);
  signout();
  useEffect(() => {
    get('/signout').then(() => {
      cookie.remove(COOKIE, { path: '/' });
      setLogout(true);
    });
  }, []);

  if (logout) {
    return <Redirect to='/signin'></Redirect>;
  }
  return <Container> Logging out ...</Container>;
}

export default Signout;