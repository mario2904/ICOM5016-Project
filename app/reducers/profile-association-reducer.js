import { PROFILE_ASSOCIATION_REQUEST, PROFILE_ASSOCIATION_SUCCESS, PROFILE_ASSOCIATION_FAILURE } from '../actions/types';

// For now ignore the REQUEST and FAILURE...

export default function(state={}, action) {

  switch (action.type) {
    case PROFILE_ASSOCIATION_SUCCESS:
      let { association_name, initials, room, page_link, email, image_path, bio, activeEvents, pastEvents, sponsors, followers } = action.payload;
      return { ...state, association_name, initials, room, page_link, email, image_path, bio, activeEvents, pastEvents, sponsors, followers };
    default:
      return state;
  }
}
