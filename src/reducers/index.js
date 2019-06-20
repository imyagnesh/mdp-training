import { combineReducers } from 'redux';
import locale from './localeReducer';
import authors from './authorsReducer';
import courses from './coursesReducer';

export default combineReducers({
  locale,
  authors,
  courses,
});
