import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_SUCCESS } from '../actions/types';

const initialState = {
  isFetching: false,
  isAuthenticated: localStorage.getItem('id_token') ? true : false,
  id: localStorage.getItem('id'),
  role: localStorage.getItem('role'),
  user_name: localStorage.getItem('user_name')
};

export default function(state=initialState, action) {

  switch (action.type) {
    case LOGIN_REQUEST:
      let { creds } = action.payload;
      return { ...state, isFetching: true, isAuthenticated: false, user: creds };
    case LOGIN_SUCCESS:
      let { id, role, user_name } = action.payload;
      return { ...state, isFetching: false, isAuthenticated: true, errorMessage: '', id, role, user_name };
    case LOGIN_FAILURE:
      let { message } = action.payload;
      return { ...state, isFetching: false, isAuthenticated: false, errorMessage: message };
    case LOGOUT_SUCCESS:
      return { ...state, isFetching: true, isAuthenticated: false };
    default:
      return state;
  }
}
