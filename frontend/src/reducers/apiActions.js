import { post, get } from '../utils/serverCall';

const getActionSuccess = (path) => {
  let name = path.split('/')[1];
  name = name.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
  name = name.toUpperCase();
  return `${name}_API_SUCCESS`;
};

const getActionError = (path) => {
  let name = path.split('/')[1];
  name = name.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
  name = name.toUpperCase();
  return `${name}_API_ERROR`;
};

export const doGet = (path, data) => (dispatch) => {
  get(path, data)
    .then((response) => {
      dispatch({ type: getActionSuccess(path), payload: response });
    })
    .catch((error) => {
      dispatch({ type: getActionError(path), payload: error });
    });
};

export const doPost = (path, data) => (dispatch) => {
  post(path, data)
    .then((response) => {
      dispatch({ type: getActionSuccess(path), payload: response });
    })
    .catch((error) => {
      dispatch({ type: getActionError(path), payload: error });
    });
};
