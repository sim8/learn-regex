import React, { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../hooks/store';
import { MODULES_CONFIG } from '../constants/lessonConfig';
import {
  getModuleCompletionPercentages,
  startOverModule,
} from '../slices/overallProgress';
import { startModule, continueModule } from '../slices/moduleProgress';
import ContinueOrStartOver from './ContinueOrStartOver';
import BigModuleButton from './BigModuleButton';

export default function ModuleSelection() {
  const moduleCompletionPercentages = useAppSelector(
    getModuleCompletionPercentages
  );
  const [startOrContinueModuleId, setStartOrContinueModuleId] = useState(null);
  const dispatch = useAppDispatch();
  const onModuleClick = (moduleId) => {
    const percentageComplete = moduleCompletionPercentages[moduleId];
    if (percentageComplete && percentageComplete < 1) {
      setStartOrContinueModuleId(moduleId);
    } else {
      dispatch(startModule(moduleId));
    }
  };

  if (startOrContinueModuleId) {
    return (
      <ContinueOrStartOver
        moduleId={startOrContinueModuleId}
        percentageComplete={
          moduleCompletionPercentages[startOrContinueModuleId]
        }
        onCancel={() => setStartOrContinueModuleId(null)}
        onContinue={() => dispatch(continueModule(startOrContinueModuleId))}
        onStartOver={() => dispatch(startOverModule(startOrContinueModuleId))}
      />
    );
  }
  return Object.keys(MODULES_CONFIG).map((key) => (
    <BigModuleButton
      key={key}
      onClick={() => onModuleClick(key)}
      percentageComplete={moduleCompletionPercentages[key]}
      module={MODULES_CONFIG[key]}
    />
  ));
}
