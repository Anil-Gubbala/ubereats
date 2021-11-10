import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/esm/Container';
import { Redirect } from 'react-router';
import cookie from 'react-cookies';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';

import { get } from '../utils/serverCall';
import { COOKIE } from '../utils/consts';
import { actionCreators, apiActionCreators } from '../reducers/actionCreators';

function Signout() {
  const dispatch = useDispatch();
  const { dispatchSignout, clearCart, clearHomeFilters } = bindActionCreators(
    actionCreators,
    dispatch
  );
  const [logout, setLogout] = useState(false);
  const { doGet, doClear } = bindActionCreators(apiActionCreators, dispatch);
  const signoutState = useSelector((state) => state.signoutApi);

  useEffect(() => {
    doGet('/signout');
    // get('/signout')
    //   .then(() => {
    //     // cookie.remove(COOKIE, { path: '/' });
    //     localStorage.clear();
    //     dispatchSignout();
    //     clearCart();
    //     clearHomeFilters();
    //     setLogout(true);
    //   })
    //   .catch(() => {
    //     console.log('error');
    //   });
  }, []);

  useEffect(() => {
    if (signoutState.status === 1) {
      if (signoutState.error === '') {
        localStorage.clear();
        doClear();
        dispatchSignout();
        clearCart();
        clearHomeFilters();
        setLogout(true);
      } else {
        console.log('error');
      }
    }
  }, [signoutState]);

  if (logout) {
    return <Redirect to="/signin" />;
  }
  return <Container> Logging out ...</Container>;
}

export default Signout;
