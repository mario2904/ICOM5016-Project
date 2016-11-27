import { combineReducers } from 'redux';
import AuthReducer from './auth-reducer';
import HomeStudentReducer from './home-student-reducer';
import HomeAssociationReducer from './home-association-reducer';
import ProfileAssociationReducer from './profile-association-reducer';
import ProfileStudentReducer from './profile-student-reducer';

const rootReducer = combineReducers ({
  auth: AuthReducer,
  home_student: HomeStudentReducer,
  home_association: HomeAssociationReducer,
  profile_association: ProfileAssociationReducer,
  profile_student: ProfileStudentReducer
});

export default rootReducer;
