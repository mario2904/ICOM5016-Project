import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_SUCCESS } from '../actions/types';

const initialState = {
  isFetching: false,
  isAuthenticated: localStorage.getItem('id_token') ? true : false,
  role: localStorage.getItem('role')
};

export default function(state=initialState, action) {

  switch (action.type) {
    case LOGIN_REQUEST:
      let { creds } = action.payload;
      return { ...state, isFetching: true, isAuthenticated: false, user: creds };
    case LOGIN_SUCCESS:
      let { role } = action.payload;
      return { ...state, isFetching: false, isAuthenticated: true, errorMessage: '', role };
    case LOGIN_FAILURE:
      let { message } = action.payload;
      return { ...state, isFetching: false, isAuthenticated: false, errorMessage: message };
    case LOGOUT_SUCCESS:
      return { ...state, isFetching: true, isAuthenticated: false };
    default:
      return state;
  }
}
