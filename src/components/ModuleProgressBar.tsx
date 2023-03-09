import React from 'react';
import { useAppSelector } from '../hooks/store';
import styled from 'styled-components';
import { getPreviousStageAsPercentage } from '../slices/moduleProgress';
import ProgressBar from './styled/ProgressBar';
import { formatPercentage } from '../utils/textUtils';

const ModuleProgressBarWrapper = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  top: 22px;
  right: 22px;
`;

export default function ModuleProgressBar() {
  // Use previous stage rather than actual completion status for smoother UX
  const PreviousStageAsPercentage = useAppSelector(
    getPreviousStageAsPercentage
  );
  return (
    <ModuleProgressBarWrapper>
      <span style={{ width: '50px', fontSize: '24px' }}>
        {formatPercentage(PreviousStageAsPercentage)}
      </span>
      <ProgressBar
        percentageComplete={PreviousStageAsPercentage}
        width="100px"
      />
    </ModuleProgressBarWrapper>
  );
}
