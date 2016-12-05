import { CREATE_STUDENT_REQUEST, CREATE_STUDENT_SUCCESS, CREATE_STUDENT_FAILURE } from '../actions/types';

// For now ignore the REQUEST and FAILURE...

export default function(state={isSuccessful: false, isWaiting: false}, action) {
  switch (action.type) {
    case CREATE_STUDENT_REQUEST:
      return {...state, isWaiting: true};
      break;
    case CREATE_STUDENT_SUCCESS:
      return {...state, isSuccessful: true, isWaiting: false};
      break;
    case CREATE_STUDENT_FAILURE:
      return {...state, isSuccessful: false, isWaiting: false};
      break
    default:
      return state;
  }
}
