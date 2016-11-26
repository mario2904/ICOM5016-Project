import { ASSOCIATION_NEWS_FEED_REQUEST, ASSOCIATION_NEWS_FEED_SUCCESS, ASSOCIATION_NEWS_FEED_FAILURE } from '../actions/types';
import { ASSOCIATION_EVENTS_REQUEST, ASSOCIATION_EVENTS_SUCCESS, ASSOCIATION_EVENTS_FAILURE } from '../actions/types';

// For now ignore the REQUEST and FAILURE...

export default function(state={}, action) {

  switch (action.type) {
    case ASSOCIATION_NEWS_FEED_SUCCESS:
      let newsFeed = action.payload;
      return { ...state, newsFeed };
    case ASSOCIATION_EVENTS_SUCCESS:
      let events = action.payload;
      return { ...state, events };
    default:
      return state;
  }
}
