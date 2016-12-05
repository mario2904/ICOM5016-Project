// Props to: https://auth0.com/blog/secure-your-react-and-redux-app-with-jwt-authentication/

import axios from 'axios';
import { CALL_API } from 'redux-api-middleware';

import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE } from './types';
import { LOGOUT_REQUEST, LOGOUT_SUCCESS, LOGOUT_FAILURE } from './types';

import { STUDENT_ASSOCIATIONS_REQUEST, STUDENT_ASSOCIATIONS_SUCCESS, STUDENT_ASSOCIATIONS_FAILURE } from './types';
import { STUDENT_NEWS_FEED_REQUEST, STUDENT_NEWS_FEED_SUCCESS, STUDENT_NEWS_FEED_FAILURE }  from './types';
import { STUDENT_EVENTS_REQUEST, STUDENT_EVENTS_SUCCESS, STUDENT_EVENTS_FAILURE } from './types';

import { ASSOCIATION_NEWS_FEED_REQUEST, ASSOCIATION_NEWS_FEED_SUCCESS, ASSOCIATION_NEWS_FEED_FAILURE } from './types';
import { ASSOCIATION_EVENTS_REQUEST, ASSOCIATION_EVENTS_SUCCESS, ASSOCIATION_EVENTS_FAILURE } from './types';

import { PROFILE_REQUEST, PROFILE_SUCCESS, PROFILE_FAILURE } from './types';

import { CREATE_FORM_REQUEST, CREATE_FORM_SUCCESS, CREATE_FORM_FAILURE } from './types';

const API_BASE_URL = '/api';

// LOGIN -----------------------------------------------------------------------

function requestLogin(creds) {
  return {
    type: LOGIN_REQUEST,
    payload: {
      isFetching: true,
      isAuthenticated: false,
      creds
    }
  }
}

function receiveLogin(user) {
  return {
    type: LOGIN_SUCCESS,
    payload: {
      isFetching: false,
      isAuthenticated: true,
      id_token: user.id_token,
      id: user.id,
      user_name: user.user_name,
      role: user.role
    }
  }
}

function loginError(message) {
  return {
    type: LOGIN_FAILURE,
    payload: {
      isFetching: false,
      isAuthenticated: false,
      message
    }
  }
}

// Calls the API to get a token and
// dispatches actions along the way
export function loginUser(creds) {
  const { email, password, role } = creds;

  const config = {
    method: 'post',
    url: `${API_BASE_URL}/login`,
    data: {
      email,
      password,
      role
    }
  }

  return dispatch => {
    // We dispatch requestLogin to kickoff the call to the API
    dispatch(requestLogin(creds))

    return axios(config)
      .then(response => {
        // If login was successful, set the token and role in local storage
        localStorage.setItem('id_token', response.data.id_token);
        localStorage.setItem('id', response.data.id);
        localStorage.setItem('role', response.data.role);
        localStorage.setItem('user_name', response.data.user_name);
        // Dispatch the success action
        dispatch(receiveLogin(response.data));
      })
      .catch(error => {
        // If there was a problem, we want to
        // dispatch the error condition
        dispatch(loginError(error));
      })
  }
}

// LOGOUT ----------------------------------------------------------------------

function requestLogout() {
  return {
    type: LOGOUT_REQUEST,
    payload: {
      isFetching: true,
      isAuthenticated: true
    }
  }
}

function receiveLogout() {
  return {
    type: LOGOUT_SUCCESS,
    payload: {
      isFetching: false,
      isAuthenticated: false
    }
  }
}

// Logs the user out
export function logoutUser() {
  return dispatch => {
    dispatch(requestLogout());
    localStorage.removeItem('id_token');
    localStorage.removeItem('id');
    localStorage.removeItem('role');
    localStorage.removeItem('user_name');
    dispatch(receiveLogout());
  }
}

// API CALLS -------------------------------------------------------------------

// Home Student calls ----------------------------------------------------------
// All require authentication (tokens)
// Where token = localStorage.getItem('id_token') || null
// It is assumed that all the caller is already authenticated and has a student role

export function fetchHomeStudentAssociations() {
  let token = localStorage.getItem('id_token');
  console.log(token);
  return {
    [CALL_API]: {
      endpoint: `${API_BASE_URL}/home-student/associations`,
      method: 'GET',
      types: [STUDENT_ASSOCIATIONS_REQUEST, STUDENT_ASSOCIATIONS_SUCCESS, STUDENT_ASSOCIATIONS_FAILURE],
      headers: { 'Authorization': `JWT ${token}` }
    }
  };
}

export function fetchHomeStudentNewsFeed() {
  let token = localStorage.getItem('id_token');
  console.log(token);
  return {
    [CALL_API]: {
      endpoint: `${API_BASE_URL}/home-student`,
      method: 'GET',
      types: [STUDENT_NEWS_FEED_REQUEST, STUDENT_NEWS_FEED_SUCCESS, STUDENT_NEWS_FEED_FAILURE],
      headers: { 'Authorization': `JWT ${token}` }
    }
  };
}

export function fetchHomeStudentEvents() {
  let token = localStorage.getItem('id_token');
  console.log(token);
  return {
    [CALL_API]: {
      endpoint: `${API_BASE_URL}/home-student/events`,
      method: 'GET',
      types: [STUDENT_EVENTS_REQUEST, STUDENT_EVENTS_SUCCESS, STUDENT_EVENTS_FAILURE],
      headers: { 'Authorization': `JWT ${token}` }
    }
  };
}

// Home Association calls ------------------------------------------------------
// All require authentication (tokens)
// Where token = localStorage.getItem('id_token') || null
// It is assumed that all the caller is already authenticated and has an association role

export function fetchHomeAssociationNewsFeed() {
  let token = localStorage.getItem('id_token');
  console.log(token);
  return {
    [CALL_API]: {
      endpoint: `${API_BASE_URL}/home-association/reviews`,
      method: 'GET',
      types: [ASSOCIATION_NEWS_FEED_REQUEST, ASSOCIATION_NEWS_FEED_SUCCESS, ASSOCIATION_NEWS_FEED_FAILURE],
      headers: { 'Authorization': `JWT ${token}` }
    }
  };
}

export function fetchHomeAssociationEvents() {
  let token = localStorage.getItem('id_token');
  console.log(token);
  return {
    [CALL_API]: {
      endpoint: `${API_BASE_URL}/home-association/events`,
      method: 'GET',
      types: [ASSOCIATION_EVENTS_REQUEST, ASSOCIATION_EVENTS_SUCCESS, ASSOCIATION_EVENTS_FAILURE],
      headers: { 'Authorization': `JWT ${token}` }
    }
  };
}

// Profile Pages calls ---------------------------------------------------------
// Does not need any TOKEN or auth. open to general public.

export function fetchProfileAssociationInfo(id) {
  return {
    [CALL_API]: {
      endpoint: `${API_BASE_URL}/association/${id}`,
      method: 'GET',
      types: [PROFILE_REQUEST, PROFILE_SUCCESS, PROFILE_FAILURE],
    }
  };
}

export function fetchProfileStudentInfo(id) {
  return {
    [CALL_API]: {
      endpoint: `${API_BASE_URL}/student/${id}`,
      method: 'GET',
      types: [PROFILE_REQUEST, PROFILE_SUCCESS, PROFILE_FAILURE],
    }
  };
}

export function fetchProfileEventInfo(id) {
  return {
    [CALL_API]: {
      endpoint: `${API_BASE_URL}/event/${id}`,
      method: 'GET',
      types: [PROFILE_REQUEST, PROFILE_SUCCESS, PROFILE_FAILURE],
    }
  };
}

// Create calls ----------------------------------------------------------------
// Does not need any TOKEN or auth. open to general public.

export function createStudent(info) {
  return {
    [CALL_API]: {
      endpoint: `${API_BASE_URL}/create/student`,
      method: 'POST',
      body: JSON.stringify(info),
      types: [CREATE_FORM_REQUEST, CREATE_FORM_SUCCESS, CREATE_FORM_FAILURE],
      headers: { 'Content-Type':'application/json' }
    }
  };
}

export function createAssociation(info) {
  return {
    [CALL_API]: {
      endpoint: `${API_BASE_URL}/create/association`,
      method: 'POST',
      body: JSON.stringify(info),
      types: [CREATE_FORM_REQUEST, CREATE_FORM_SUCCESS, CREATE_FORM_FAILURE],
      headers: { 'Content-Type':'application/json' }
    }
  };
}
