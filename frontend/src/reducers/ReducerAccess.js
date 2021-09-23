import React from 'react';
import { useSelector } from 'react-redux';

// we can use both accessor & dispatcher in same file.
const ReducerAccess = () => {
  const value = useSelector((state) => state.loggedReducer);
  console.log(value);
  return <></>;
};

export default ReducerAccess;
