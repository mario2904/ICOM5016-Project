import { FORM_REQUEST, FORM_SUCCESS, FORM_FAILURE } from '../actions/types';

// For now ignore the REQUEST and FAILURE...

export default function(state={isSuccessful: false, isWaiting: false}, action) {
  switch (action.type) {
    case FORM_REQUEST:
      return {...state, isWaiting: true};
      break;
    case FORM_SUCCESS:
      return {...state, isSuccessful: true, isWaiting: false};
      break;
    case FORM_FAILURE:
      return {...state, isSuccessful: false, isWaiting: false};
      break
    default:
      return state;
  }
}
