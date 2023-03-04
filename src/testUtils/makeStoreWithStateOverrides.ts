import {
  initialState as overallProgressInitialState,
  OverallProgressState,
} from '../slices/overallProgress';
import {
  initialState as moduleProgressInitialState,
  ModuleProgressState,
} from '../slices/moduleProgress';
import { initialState as inputInitialState, InputState } from '../slices/input';
import { makeStore, RootState } from '../store';

const makeStoreWithTestOverrides = ({
  moduleProgress = {},
  overallProgress = {},
  input = {},
}: {
  moduleProgress?: Partial<ModuleProgressState>;
  overallProgress?: Partial<OverallProgressState>;
  input?: Partial<InputState>;
}) =>
  makeStore({
    moduleProgress: {
      ...moduleProgressInitialState,
      ...moduleProgress,
    },
    overallProgress: {
      ...overallProgressInitialState,
      ...overallProgress,
    },
    input: {
      ...inputInitialState,
      ...input,
    },
  });

export default makeStoreWithTestOverrides;
