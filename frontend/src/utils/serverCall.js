import Axios from 'axios';
import CONSTANTS from './consts';

Axios.defaults.withCredentials = true;

// Axios.defaults.headers = {
//   // 'Access-Control-Allow-Credentials': true,
//   // 'Access-Control-Allow-Origin': '*',
// };

const get = (path, data) => {
  Axios.defaults.headers.common.authorization = localStorage.getItem(CONSTANTS.TOKEN);
  return Axios.get(CONSTANTS.SERVERURL + path, { params: data })
    .then((response) => response.data)
    .catch((error) => {
      if (error.response.data.err) {
        throw error.response.data.err;
      } else {
        throw 'server side error';
      }
    });
};

const post = (path, data) => {
  // Axios.defaults.headers.common.authorization = localStorage.getItem(CONSTANTS.TOKEN);
  // Axios.defaults.headers.common.authorization = null;
  return Axios.post(CONSTANTS.SERVERURL + path, data, { mode: 'cors' })
    .then((response) => response.data)
    .catch((error) => {
      if (error.response.data.err) {
        throw error.response.data.err;
      } else {
        throw 'server side error';
      }
    });
};

export { get, post };
