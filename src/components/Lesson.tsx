import React from 'react';
import Prompt from './Prompt';
import { getStageConfig } from '../slices/moduleProgress';
import { useAppSelector } from '../hooks/store';

export default function Stage() {
  const { text } = useAppSelector(getStageConfig);
  return (
    <div className="stage">
      {text.map((t, index) => (
        <p key={index}>{t}</p>
      ))}
      <Prompt />
    </div>
  );
}
