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

import { PROFILE_ASSOCIATION_REQUEST, PROFILE_ASSOCIATION_SUCCESS, PROFILE_ASSOCIATION_FAILURE } from './types';
import { PROFILE_STUDENT_REQUEST, PROFILE_STUDENT_SUCCESS, PROFILE_STUDENT_FAILURE } from './types';
import { PROFILE_EVENT_REQUEST, PROFILE_EVENT_SUCCESS, PROFILE_EVENT_FAILURE } from './types';

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
        localStorage.setItem('role', response.data.role);
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
    localStorage.removeItem('role');
    dispatch(receiveLogout());
  }
}

// API CALLS -------------------------------------------------------------------

// Home Student calls ----------------------------------------------------------
// All require authentication (tokens)
// TODO: Use tokens in each call by adding => headers: { 'Authorization': `Bearer ${token}` }
// Where token = localStorage.getItem('id_token') || null
// It is assumed that all the caller is already authenticated and has a student role

export function fetchHomeStudentAssociations() {
  let token = localStorage.getItem('id_token');
  return {
    [CALL_API]: {
      endpoint: `${API_BASE_URL}/home-student/associations`,
      method: 'GET',
      types: [STUDENT_ASSOCIATIONS_REQUEST, STUDENT_ASSOCIATIONS_SUCCESS, STUDENT_ASSOCIATIONS_FAILURE],
      headers: { 'Authorization': `Bearer ${token}` }
    }
  };
}

export function fetchHomeStudentNewsFeed() {
  let token = localStorage.getItem('id_token');
  return {
    [CALL_API]: {
      endpoint: `${API_BASE_URL}/home-student`,
      method: 'GET',
      types: [STUDENT_NEWS_FEED_REQUEST, STUDENT_NEWS_FEED_SUCCESS, STUDENT_NEWS_FEED_FAILURE],
      headers: { 'Authorization': `Bearer ${token}` }
    }
  };
}

export function fetchHomeStudentEvents() {
  let token = localStorage.getItem('id_token');
  return {
    [CALL_API]: {
      endpoint: `${API_BASE_URL}/home-student/events`,
      method: 'GET',
      types: [STUDENT_EVENTS_REQUEST, STUDENT_EVENTS_SUCCESS, STUDENT_EVENTS_FAILURE],
      headers: { 'Authorization': `Bearer ${token}` }
    }
  };
}

// Home Association calls ------------------------------------------------------
// All require authentication (tokens)
// TODO: Use tokens in each call by adding => headers: { 'Authorization': `Bearer ${token}` }
// Where token = localStorage.getItem('id_token') || null

export function fetchHomeAssociationNewsFeed() {
  return {
    [CALL_API]: {
      endpoint: `${API_BASE_URL}/home-association/reviews`,
      method: 'GET',
      types: [ASSOCIATION_NEWS_FEED_REQUEST, ASSOCIATION_NEWS_FEED_SUCCESS, ASSOCIATION_NEWS_FEED_FAILURE],
    }
  };
}

export function fetchHomeAssociationEvents() {
  return {
    [CALL_API]: {
      endpoint: `${API_BASE_URL}/home-association/events`,
      method: 'GET',
      types: [ASSOCIATION_EVENTS_REQUEST, ASSOCIATION_EVENTS_SUCCESS, ASSOCIATION_EVENTS_FAILURE],
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
      types: [PROFILE_ASSOCIATION_REQUEST, PROFILE_ASSOCIATION_SUCCESS, PROFILE_ASSOCIATION_FAILURE],
    }
  };
}

export function fetchProfileStudentInfo(id) {
  return {
    [CALL_API]: {
      endpoint: `${API_BASE_URL}/student/${id}`,
      method: 'GET',
      types: [PROFILE_STUDENT_REQUEST, PROFILE_STUDENT_SUCCESS, PROFILE_STUDENT_FAILURE],
    }
  };
}

export function fetchProfileEventInfo(id) {
  return {
    [CALL_API]: {
      endpoint: `${API_BASE_URL}/event/${id}`,
      method: 'GET',
      types: [PROFILE_EVENT_REQUEST, PROFILE_EVENT_SUCCESS, PROFILE_EVENT_FAILURE],
    }
  };
}
