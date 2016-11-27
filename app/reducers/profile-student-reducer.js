import { PROFILE_STUDENT_REQUEST, PROFILE_STUDENT_SUCCESS, PROFILE_STUDENT_FAILURE } from '../actions/types';

// For now ignore the REQUEST and FAILURE...

export default function(state={}, action) {

  switch (action.type) {
    case PROFILE_STUDENT_SUCCESS:
      let { first_name, last_name, gender, hometown, college, major, image_path, bio, email, interestedEvents, followedAssociations } = action.payload;
      return { ...state, first_name, last_name, gender, hometown, college, major, image_path, bio, email, interestedEvents, followedAssociations };
    default:
      return state;
  }
}
