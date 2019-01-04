import callAPI from '../utils/apiCaller';
import { authHeader } from '../helpers';

function getList(pageNumber, limit, paramSearch) {
  
  const requestOptions = {
    url: `status`,
    method: 'POST',
    headers: authHeader(),
    body: JSON.stringify({
      "pagination": {
        "page": parseInt(pageNumber, 10),
        "perpage": parseInt(limit, 10)
      },
      "query": {
        "name": paramSearch.name,
        "status": paramSearch.status
      }
    })
  };

  return callAPI(requestOptions).then(res => {
    return res.data;
  });
}

export const statusService = {
  getList
};