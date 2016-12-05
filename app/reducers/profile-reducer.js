import { PROFILE_REQUEST, PROFILE_SUCCESS, PROFILE_FAILURE } from '../actions/types';

// For now ignore the REQUEST and FAILURE...

export default function(state={}, action) {

  switch (action.type) {
    case PROFILE_SUCCESS:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}
