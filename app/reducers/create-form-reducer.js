import { CREATE_FORM_REQUEST, CREATE_FORM_SUCCESS, CREATE_FORM_FAILURE } from '../actions/types';

// For now ignore the REQUEST and FAILURE...

export default function(state={isSuccessful: false, isWaiting: false}, action) {
  switch (action.type) {
    case CREATE_FORM_REQUEST:
      return {...state, isWaiting: true};
      break;
    case CREATE_FORM_SUCCESS:
      return {...state, isSuccessful: true, isWaiting: false};
      break;
    case CREATE_FORM_FAILURE:
      return {...state, isSuccessful: false, isWaiting: false};
      break
    default:
      return state;
  }
}
