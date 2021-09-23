import Axios from 'axios';
import { SERVERURL } from './consts';

Axios.defaults.withCredentials = true;
// Axios.defaults.headers = {
//   // 'Access-Control-Allow-Credentials': true,
//   // 'Access-Control-Allow-Origin': '*',
// };

const get = (path, data) =>
  Axios.get(SERVERURL + path, data)
    .then()
    .catch();

const post = (path, data) =>
  Axios.post(SERVERURL + path, data, { mode: 'cors' })
    .then((response) => response.data)
    .catch();

export { get, post };
