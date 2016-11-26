import { combineReducers } from 'redux';
import AuthReducer from './auth-reducer';
import HomeStudentReducer from './home-student-reducer';
import HomeAssociationReducer from './home-association-reducer';

const rootReducer = combineReducers ({
  auth: AuthReducer,
  home_student: HomeStudentReducer,
  home_association: HomeAssociationReducer
});

export default rootReducer;
