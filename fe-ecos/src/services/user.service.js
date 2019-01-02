import callAPI from '../utils/apiCaller';

const login = (username, password, remember_me) => {

  const requestOptions = {
    url: 'auth/login',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password, remember_me })
  };

  return callAPI(requestOptions).then(res => {
    return res.data;
  });
}

export const userService = {
  login
};
