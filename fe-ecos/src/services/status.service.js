import callAPI from '../utils/apiCaller';
import { authHeader } from '../helpers';

function getList(pageNumber) {
  const requestOptions = {
      url: `status`,
      method: 'POST',
      headers: authHeader()
  };

  console.log(requestOptions);
  

  return callAPI(requestOptions).then(res => {
    console.log(res);
    
  });
}

export const statusService = {
  getList
};