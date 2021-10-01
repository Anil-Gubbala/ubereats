import Axios from 'axios';
import CONSTANTS from './consts';

Axios.defaults.withCredentials = true;
// Axios.defaults.headers = {
//   // 'Access-Control-Allow-Credentials': true,
//   // 'Access-Control-Allow-Origin': '*',
// };

const get = (path, data) => {
  console.log(data);
  return Axios.get(CONSTANTS.SERVERURL + path, { params: data })
    .then((response) => response.data)
    .catch();
};

const post = (path, data) => {
  return Axios.post(CONSTANTS.SERVERURL + path, data, { mode: 'cors' })
    .then((response) => response.data)
    .catch();
};

export { get, post };
