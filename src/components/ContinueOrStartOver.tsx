import React from 'react';
import { MODULES_CONFIG } from '../constants/lessonConfig';
import { ModuleKey } from '../types';
import { formatPercentage } from '../utils/textUtils';
import Button from './styled/Button';
import FullScreenCenter from './styled/FullScreenCenter';
import Link from './styled/Link';

type Props = {
  moduleId: ModuleKey;
  percentageComplete: number;
  onCancel: () => void;
  onContinue: () => void;
  onStartOver: () => void;
};

export default function ContinueOrStartOver({
  moduleId,
  percentageComplete,
  onCancel,
  onContinue,
  onStartOver,
}: Props) {
  const textContent = `You've completed ${formatPercentage(
    percentageComplete
  )} of `;
  return (
    <FullScreenCenter>
      <div style={{ marginBottom: '40px' }}>
        {textContent}
        <span className="code">{MODULES_CONFIG[moduleId].name}</span>.
      </div>
      <div style={{ marginBottom: '40px' }}>
        <Button use="primary" onClick={onContinue}>
          Continue
        </Button>
        <Button onClick={onStartOver}>Start over</Button>
      </div>
      <Link
        href="#"
        onClick={(e) => {
          e.preventDefault();
          onCancel();
        }}
      >
        Back
      </Link>
    </FullScreenCenter>
  );
}
