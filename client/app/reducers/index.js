import { combineReducers } from 'redux';

const rootReducer = combineReducers ({
  test: (state='test', action) => {return {foo: 'bar'}}
});

export default rootReducer;
