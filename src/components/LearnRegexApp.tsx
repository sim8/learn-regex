import React from 'react';
import { useAppSelector } from '../hooks/store';

import Stage from './Stage';
import { getModuleId, getModuleIsComplete } from '../slices/moduleProgress';
import ModuleSelection from './ModuleSelection';
import ModuleComplete from './ModuleComplete';
import Nav from './Nav';

export default function LearnRegexApp() {
  const isInModule = !!useAppSelector(getModuleId);
  const moduleComplete = useAppSelector(getModuleIsComplete);

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
