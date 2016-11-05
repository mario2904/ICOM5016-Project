import { UPDATE_ASSOCIATIONS } from '../actions/types';

export default function(state=[], action) {
  switch(action.type) {
    case UPDATE_ASSOCIATIONS:
      return action.payload;
  }
  return state;
}
