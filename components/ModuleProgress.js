'use es6';

import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

import ProgressBar from './styled/ProgressBar';
import { getCurrentModuleCompletionPercentage } from '../selectors/moduleProgressSelectors';

const ModuleProgressWrapper = styled.div`
  position: fixed;
  bottom: 20px;
  left: 20px;
  width: 200px;
`;

export default function ModuleProgress() {
  const percentageComplete = useSelector(getCurrentModuleCompletionPercentage);
  if (!percentageComplete) {
    return null;
  }
  return (
    <ModuleProgressWrapper>
      <ProgressBar percentageComplete={percentageComplete} />
    </ModuleProgressWrapper>
  );
}
