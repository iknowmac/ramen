import { combineReducers } from 'redux';
import tasks from './tasks';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
  tasks: tasks,
  routing: routerReducer,
  form: formReducer,
});

export default rootReducer;
