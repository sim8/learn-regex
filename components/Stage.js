import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Test from './Test';
import Choice from './Choice';
import Button from './styled/Button';
import {
  getStageConfig,
  getCanMoveToNextStage,
  getCanMoveToPreviousStage,
  getStageId,
  getProvidedAnswerIsCorrect,
  getModuleComplete,
} from '../selectors/progressSelectors';
import {
  moveToNextScreen,
  moveToPreviousStage,
} from '../actions/progressActions';
import { STAGE_TYPES } from '../constants/lessonConfig';
import ModuleComplete from './ModuleComplete';

const StageWrapper = styled.div`
  .main-text {
    padding-top: 13vh;
    min-height: 300px;
    .complete-text {
      font-style: italic;
    }
    .code {
      color: black;
      background-color: #adff12;
      font-style: normal;
    }
  }
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
  margin: 0 20px;
`;

const NavButtons = styled.div`
  height: 70px;
  padding-bottom: 10vh;
`;

const mapStateToProps = state => ({
  stageId: getStageId(state),
  stageConfig: getStageConfig(state),
  canMoveToNextStage: getCanMoveToNextStage(state),
  canMoveToPreviousStage: getCanMoveToPreviousStage(state),
  answerCorrect: getProvidedAnswerIsCorrect(state),
  moduleComplete: getModuleComplete(state),
});

function renderStageContent({ type, ...config }, id) {
  switch (type) {
    case STAGE_TYPES.REGEX:
      return <Test {...config} stageId={id} />;
    case STAGE_TYPES.CHOICE:
      return <Choice {...config} stageId={id} />;
    default:
      return null;
  }
}

function renderTextLines(textLines) {
  return textLines.map(t => (
    // eslint-disable-next-line react/no-array-index-key
    // eslint-disable-next-line react/no-danger
    <p key={`${t}`} dangerouslySetInnerHTML={{ __html: t }} />
  ));
}

function Stage({
  stageConfig,
  stageId,
  canMoveToNextStage,
  canMoveToPreviousStage,
  answerCorrect,
  onClickNext,
  onClickBack,
  moduleComplete,
}) {
  const { type, text, successText, failText } = stageConfig;
  const completeText =
    type !== STAGE_TYPES.CHOICE || answerCorrect ? successText : failText;
  if (moduleComplete) {
    return <ModuleComplete />;
  }
  return (
    <StageWrapper>
      <div className="main-text">
        {renderTextLines(text)}
        {canMoveToNextStage && completeText && (
          <div className="complete-text">{renderTextLines(completeText)}</div>
        )}
      </div>
      {renderStageContent(stageConfig, stageId)}
      <NavButtons>
        {canMoveToPreviousStage && <Button onClick={onClickBack}>BACK</Button>}
        {canMoveToNextStage && (
          <Button type="primary" onClick={onClickNext}>
            CONTINUE
          </Button>
        )}
      </NavButtons>
    </StageWrapper>
  );
}
export default connect(mapStateToProps, {
  onClickNext: moveToNextScreen,
  onClickBack: moveToPreviousStage,
})(Stage);
