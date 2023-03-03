import React from 'react';
import { MODULES_CONFIG } from '../constants/lessonConfig';
import { ModuleKey } from '../types';
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
  return (
    <FullScreenCenter>
      <div style={{ marginBottom: '40px' }}>
        You've completed {Math.floor(percentageComplete * 100)}% of{' '}
        <span className="code">{MODULES_CONFIG[moduleId].name}</span>.
      </div>
      <div style={{ marginBottom: '40px' }}>
        <Button use="primary" onClick={onContinue}>
          Continue
        </Button>
        <Button onClick={onStartOver}>Start over</Button>
      </div>
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
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
