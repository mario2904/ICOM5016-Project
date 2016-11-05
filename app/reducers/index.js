import { combineReducers } from 'redux';
import EventReducer from './event-reducer';
import AssociationReducer from './association-reducer';

const rootReducer = combineReducers ({
  events: EventReducer,
  associations: AssociationReducer
});

export default rootReducer;
