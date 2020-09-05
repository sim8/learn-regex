import React from 'react';
import { useSelector } from 'react-redux';

import Stage from './Stage';
import {
  getModuleId,
  getModuleComplete,
} from '../selectors/moduleProgressSelectors';
import ModuleSelection from './ModuleSelection';
import ModuleComplete from './ModuleComplete';
import Nav from './Nav';

export default function LearnRegexApp() {
  const isInModule = !!useSelector(getModuleId);
  const moduleComplete = useSelector(getModuleComplete);

  let page;
  if (!isInModule) {
    page = <ModuleSelection />;
  } else if (moduleComplete) {
    page = <ModuleComplete />;
  } else {
    page = <Stage />;
  }
  return (
    <>
      {page}
      <Nav />
    </>
  );
}
