import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import moduleProgressReducer from './slices/moduleProgress';
import overallProgressReducer from './slices/overallProgress';
import inputReducer from './slices/input';

export function makeStore() {
  return configureStore({
    reducer: {
      moduleProgress: moduleProgressReducer,
      overallProgress: overallProgressReducer,
      input: inputReducer,
    },
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
