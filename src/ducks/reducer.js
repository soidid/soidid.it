import { combineReducers } from 'redux';

import legislators from './legislators';
import issues from './issues';
import parties from './parties';
import records from './records';
import uiStates from './uiStates';

import processingState from './processingState';

export default combineReducers({
  legislators,
  issues,
  parties,
  records,
  processingState,
  uiStates
});
