import { STUDENT_ASSOCIATIONS_REQUEST, STUDENT_ASSOCIATIONS_SUCCESS, STUDENT_ASSOCIATIONS_FAILURE } from '../actions/types';
import { STUDENT_NEWS_FEED_REQUEST, STUDENT_NEWS_FEED_SUCCESS, STUDENT_NEWS_FEED_FAILURE } from '../actions/types';
import { STUDENT_EVENTS_REQUEST, STUDENT_EVENTS_SUCCESS, STUDENT_EVENTS_FAILURE } from '../actions/types';

// For now ignore the REQUEST and FAILURE...

export default function(state={}, action) {

  switch (action.type) {
    case STUDENT_ASSOCIATIONS_SUCCESS:
      let associations = action.payload;
      return { ...state, associations };
    case STUDENT_NEWS_FEED_SUCCESS:
      let newsFeed = action.payload;
      return { ...state, newsFeed };
    case STUDENT_EVENTS_SUCCESS:
      let events = action.payload;
      return { ...state, events };
    default:
      return state;
  }
}
