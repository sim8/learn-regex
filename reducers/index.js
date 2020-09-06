import { combineReducers } from 'redux';
import input from './input';
import moduleProgress from './moduleProgress';
import overallProgress from './overallProgress';

export default combineReducers({ input, moduleProgress, overallProgress });
