import axios from 'axios';
import { UPDATE_EVENTS, UPDATE_ASSOCIATIONS } from './types';

const API_ROOT_URL = '/api';


function handleError(error) {
  console.log(error)
  return {
    type: ERROR,
    payload: error
  }
}

function handleSuccess(type, payload) {
  console.log(payload);
  return {
    type,
    payload
  }
}

export function fetchEvents(filter) {
  // 'filter' will be used as query param later on...

  // Get Events Data
  return function(dispatch) {
    axios.get(`${API_ROOT_URL}/event/all`)
    .then(function (response) {
      return dispatch(handleSuccess(UPDATE_EVENTS, response.data.events));
    })
    .catch(function (error) {
      return dispatch(handleError(error));
    });
  };
}

export function fetchAssociations(filter) {
  // 'filter' will be used as query param later on...

  // Get Events Data
  return function(dispatch) {
    axios.get(`${API_ROOT_URL}/association/all`)
    .then(function (response) {
      return dispatch(handleSuccess(UPDATE_ASSOCIATIONS, response.data.associations));
    })
    .catch(function (error) {
      return dispatch(handleError(error));
    });
  };
}
