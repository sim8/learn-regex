import {
  configureStore,
  ThunkAction,
  Action,
  combineReducers,
} from '@reduxjs/toolkit';

import moduleProgressReducer from './slices/moduleProgress';
import overallProgressReducer from './slices/overallProgress';
import inputReducer from './slices/input';

const reducer = combineReducers({
  moduleProgress: moduleProgressReducer,
  overallProgress: overallProgressReducer,
  input: inputReducer,
});

export type RootState = ReturnType<typeof reducer>;

export function makeStore(preloadedState?: Partial<RootState>) {
  return configureStore({
    reducer,
    preloadedState,
  });
}

const store = makeStore();

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>;

export default store;
