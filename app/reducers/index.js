import { combineReducers } from 'redux';
import AuthReducer from './auth-reducer';
import HomeStudentReducer from './home-student-reducer';
import HomeAssociationReducer from './home-association-reducer';
import ProfileAssociationReducer from './profile-association-reducer';
import ProfileStudentReducer from './profile-student-reducer';
import ProfileEventReducer from './profile-event-reducer';
import CreateStudentReducer from './create-student-reducer';

const rootReducer = combineReducers ({
  auth: AuthReducer,
  home_student: HomeStudentReducer,
  home_association: HomeAssociationReducer,
  profile_association: ProfileAssociationReducer,
  profile_student: ProfileStudentReducer,
  profile_event: ProfileEventReducer,
  create_student: CreateStudentReducer
});

export default rootReducer;
