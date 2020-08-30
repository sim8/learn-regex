import React from 'react';
import { useSelector } from 'react-redux';

import Stage from './Stage';
import {
  getModuleId,
  getModuleComplete,
} from '../selectors/moduleProgressSelectors';
import ModuleSelection from './ModuleSelection';
import ModuleComplete from './ModuleComplete';

export default function LearnRegexApp() {
  const isInModule = !!useSelector(getModuleId);
  const moduleComplete = useSelector(getModuleComplete);

  if (!isInModule) {
    return <ModuleSelection />;
  }
  if (moduleComplete) {
    return <ModuleComplete />;
  }
  return <Stage />;
}
