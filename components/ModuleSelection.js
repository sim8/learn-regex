import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { MODULES_CONFIG } from '../constants/lessonConfig';
import { getModuleCompletionPercentages } from '../selectors/overallProgressSelectors';
import {
  startModule,
  continueModule,
  startOverModule,
} from '../actions/moduleProgressActions';
import ContinueOrStartOver from './ContinueOrStartOver';
import BigModuleButton from './BigModuleButton';

export default function ModuleSelection() {
  const moduleCompletionPercentages = useSelector(
    getModuleCompletionPercentages
  );
  const [startOrContinueModuleId, setStartOrContinueModuleId] = useState(null);
  const dispatch = useDispatch();
  const onModuleClick = moduleId => {
    const percentageComplete = moduleCompletionPercentages.get(moduleId);
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
        percentageComplete={moduleCompletionPercentages.get(
          startOrContinueModuleId
        )}
        onCancel={() => setStartOrContinueModuleId(null)}
        onContinue={() => dispatch(continueModule(startOrContinueModuleId))}
        onStartOver={() => dispatch(startOverModule(startOrContinueModuleId))}
      />
    );
  }
  return Object.keys(MODULES_CONFIG).map(key => (
    <BigModuleButton
      key={key}
      onClick={() => onModuleClick(key)}
      percentageComplete={moduleCompletionPercentages.get(key)}
      module={MODULES_CONFIG[key]}
    />
  ));
}
