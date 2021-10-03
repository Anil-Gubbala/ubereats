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
  const { signout, clearCart } = bindActionCreators(actionCreators, dispatch);
  const [logout, setLogout] = useState(false);

  useEffect(() => {
    get('/signout')
      .then(() => {
        // cookie.remove(COOKIE, { path: '/' });
        localStorage.clear();
        signout();
        clearCart();
        setLogout(true);
      })
      .catch(() => {
        console.log('error');
      });
  }, []);

  if (logout) {
    return <Redirect to='/signin'></Redirect>;
  }
  return <Container> Logging out ...</Container>;
}

export default Signout;
