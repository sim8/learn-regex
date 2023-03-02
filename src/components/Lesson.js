import React from 'react';
import { connect } from 'react-redux';
import Prompt from './Prompt';
import { getStageConfig } from '../selectors/moduleProgressSelectors';

const mapStateToProps = state => ({
  stageConfig: getStageConfig(state),
});

function Stage({ stageConfig }) {
  const { text } = stageConfig;
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
export default connect(mapStateToProps, {})(Stage);
