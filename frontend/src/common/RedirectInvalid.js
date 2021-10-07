import { Redirect } from 'react-router';
import React from 'react';

function RedirectInvalid() {
  return <Redirect to='/invalid' />;
}

export default RedirectInvalid;
