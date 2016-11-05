import { UPDATE_EVENTS } from '../actions/types';

export default function(state=[], action) {
  switch(action.type) {
    case UPDATE_EVENTS:
      return action.payload;
  }
  return state;
}
