import React from 'react';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { customer } from './actions';
import { actionCreators } from './actionCreators';

const ActionDispatcher = () => {
  const dispatch = useDispatch();
  return (
    <>
      <buuton
        onClick={() => {
          dispatch(customer);
        }}
      >
        Dispatch action
      </buuton>
    </>
  );
};

const NewActionDispatcher = () => {
  const dispatch = useDispatch();
  const actionsObject = bindActionCreators(actionCreators, dispatch);
  return (
    <>
      <buuton
        onClick={() => {
          actionsObject.customer();
        }}
      >
        Dispatch action
      </buuton>
    </>
  );
};
