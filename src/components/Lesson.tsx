import React from 'react';
import { connect } from 'react-redux';
import Prompt from './Prompt';
import { getStageConfig } from '../slices/moduleProgress';
import { useAppSelector } from '../hooks/store';

export default function Stage() {
  const { text } = useAppSelector(getStageConfig);
  return (
    <div className="stage">
      {text.map((t, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <p key={index}>{t}</p>
      ))}
      <Prompt />
    </div>
  );
}
