import axios from 'axios';
import * as Config from '../constants/config';

export default function callAPI(options) {
  return axios({
    url: `${Config.API_URL}/${options.url}`,
    method: options.method,
    headers: options.headers,
    data: options.body
  }).catch(err => {
    console.log(err);
  });
}