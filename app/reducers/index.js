import { combineReducers } from 'redux';
import AuthReducer from './auth-reducer';
import HomeStudentReducer from './home-student-reducer';
import HomeAssociationReducer from './home-association-reducer';
import ProfileReducer from './profile-reducer';
import FormReducer from './form-reducer';
import OptionsReducer from './options-reducer';

const rootReducer = combineReducers ({
  auth: AuthReducer,
  home_student: HomeStudentReducer,
  home_association: HomeAssociationReducer,
  profile: ProfileReducer,
  form: FormReducer,
  options: OptionsReducer
});

export default rootReducer;
