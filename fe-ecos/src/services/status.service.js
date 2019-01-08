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

function create(status) {
  const requestOptions = {
    url: `status/add`,
    method: 'POST',
    headers: authHeader(),
    body: JSON.stringify(status)
  }
  return callAPI(requestOptions).then(res => {
    return res.data;
  });
}

function update(status) {
  const requestOptions = {
    url: `status/edit/${status.id}`,
    method: 'POST',
    headers: authHeader(),
    body: JSON.stringify(status)
  }
  return callAPI(requestOptions).then(res => {
    return res.data;
  });
}

function remove(id) {
  const requestOptions = {
    url: `status/delete/${id}`,
    method: 'POST',
    headers: authHeader(),
    body: {}
  }
  return callAPI(requestOptions).then(res => {
    return res.data;
  });
}

export const statusService = {
  getList,
  create,
  update,
  remove
};