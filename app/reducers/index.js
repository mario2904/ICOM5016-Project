import { combineReducers } from 'redux';
import AuthReducer from './auth-reducer';
import HomeStudentReducer from './home-student-reducer';
import HomeAssociationReducer from './home-association-reducer';
import ProfileReducer from './profile-reducer';
import CreateFormReducer from './create-form-reducer';

const rootReducer = combineReducers ({
  auth: AuthReducer,
  home_student: HomeStudentReducer,
  home_association: HomeAssociationReducer,
  profile: ProfileReducer,
  create_form: CreateFormReducer
});

export default rootReducer;
