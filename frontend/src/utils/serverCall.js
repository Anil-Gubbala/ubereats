import { ThirteenMpTwoTone } from '@mui/icons-material';
import Axios from 'axios';
import CONSTANTS from './consts';

Axios.defaults.withCredentials = true;
// Axios.defaults.headers = {
//   // 'Access-Control-Allow-Credentials': true,
//   // 'Access-Control-Allow-Origin': '*',
// };

const get = (path, data) =>
  Axios.get(CONSTANTS.SERVERURL + path, { params: data })
    .then((response) => response.data)
    .catch((error) => {
      if (error.response.data.err) {
        throw error.response.data.err;
      } else {
        throw 'server side error';
      }
    });

const post = (path, data) =>
  Axios.post(CONSTANTS.SERVERURL + path, data, { mode: 'cors' })
    .then((response) => response.data)
    .catch((error) => {
      if (error.response.data.err) {
        throw error.response.data.err;
      } else {
        throw 'server side error';
      }
    });

export { get, post };
