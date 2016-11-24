import axios from 'axios';
import { browserHistory } from 'react-router';
import {
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR,
  GET_MESSAGE
  } from './types';

//**IMPORTANT** - TYPE WHATEVER URL YOU WANT BELOW:
//FOR DEVELOPMENT: 'http://localhost:  { port of your choice} , 8000 is my default'
const ROOT_URL = 'http://localhost:8000';

export function loginUser({ email, password }) {
  return function(dispatch){
    //submit email/password to server
    axios.post(`${ROOT_URL}/login`, { email, password })
      .then(response => {
        // if request is good..
        //update state to indicate user is authenticated
        dispatch({ type: AUTH_USER });
        // - save JWT token to local storage. local storage is
        //native to windows scope redirect
        localStorage.setItem('token', response.data.token);
        browserHistory.push('/dashboard');
      })
      .catch(() => {
        dispatch(authError('Bad Login Info'));
      });
  }
}

export function registerUser({ first_name, last_name, email, password }){
  return function(dispatch){
    axios.post(`${ROOT_URL}/register`, { first_name, last_name, email, password })
      .then(response => {
        dispatch({ type: AUTH_USER });
        localStorage.setItem('token', response.data.token);
        browserHistory.push('/dashboard');
      })
      .catch(response => dispatch(authError(response.data.error)));
  }
}

export function logoutUser(){
  localStorage.removeItem('token'); //finds key called 'token' in local state
  return { type: UNAUTH_USER };
}

export function getMessage(){
  return function(dispatch){
    axios.get(ROOT_URL, {
      headers: { authorization: localStorage.getItem('token') }
    })
      .then(response => {
        dispatch({
          type: GET_MESSAGE,
          payload: response.data.message
        });
      });
  }
}

export function authError(error){
  return {
    type: AUTH_ERROR,
    payload: error
  };
}

//else, give error
