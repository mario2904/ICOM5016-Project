import { OPTIONS_REQUEST, OPTIONS_SUCCESS, OPTIONS_FAILURE } from '../actions/types';

export default function(state={}, action) {

  switch (action.type) {
    case OPTIONS_SUCCESS:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}
