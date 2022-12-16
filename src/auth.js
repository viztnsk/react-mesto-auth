export const BASE_URL = 'https://auth.nomoreparties.co';

export const register = (email, password) => {
  return fetch (`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password })
  }).then((response) => {
      if (response.ok){
        return response.json();
      }
      return Promise.reject(`Ошибка: ${response.status}`);
  })
  .then((data) => {
    localStorage.setItem("jwt", data._id);
    return data;
  })
  .catch((err) => console.log(err));
}

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({email, password})
  })
  .then((response) => {
    if (response.ok){
      return response.json();
    }
    return Promise.reject(`Ошибка: ${response.status}`);
  })
  .then((data) => {
    if (data.token) {
      localStorage.setItem('token', data.token);
      return data;
    }
    else {
      return;
    }
    })
  .catch(err => console.log(err))
};

export const getContent = (jwt) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      "Authorization" : `Bearer ${jwt}`} 
  })
  .then((res) => { 
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
}