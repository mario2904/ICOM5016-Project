import { PROFILE_EVENT_REQUEST, PROFILE_EVENT_SUCCESS, PROFILE_EVENT_FAILURE } from '../actions/types';

// For now ignore the REQUEST and FAILURE...

export default function(state={}, action) {

  switch (action.type) {
    case PROFILE_EVENT_SUCCESS:
      let { event_name, association_id, association_name, start_date, end_date, start_time, end_time, room, image_path, description, registration_link, interested, updates, reviews, categories } = action.payload;
      return { ...state, event_name, association_id, association_name, start_date, end_date, start_time, end_time, room, image_path, description, registration_link, interested, updates, reviews, categories };
    default:
      return state;
  }
}
