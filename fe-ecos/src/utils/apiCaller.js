import axios from 'axios';
import * as Config from '../constants/config';

export default function callAPI(options) {
  return axios({
    method: options.method,
    headers: options.headers,
    url: `${Config.API_URL}/${options.url}`,
    data: options.body
  }).catch(err => {
    console.log(err);
  });
}