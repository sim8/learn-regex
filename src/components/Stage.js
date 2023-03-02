import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
  moveToNextScreen,
  moveToPreviousStage,
} from '../slices/moduleProgress';
import { STAGE_TYPES } from '../constants/lessonConfig';

const StageWrapper = styled.div`
  .main-text {
    padding-top: 13vh;
    min-height: 300px;
    .complete-text {
      font-style: italic;
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
  return textLines.map((t) => (
    // eslint-disable-next-line react/no-array-index-key
    // eslint-disable-next-line react/no-danger
    <p key={`${t}`} dangerouslySetInnerHTML={{ __html: t }} />
  ));
}

export default function Stage() {
  const dispatch = useDispatch();
  const stageId = useSelector(getStageId);
  const stageConfig = useSelector(getStageConfig);
  const canMoveToNextStage = useSelector(getCanMoveToNextStage);
  const canMoveToPreviousStage = useSelector(getCanMoveToPreviousStage);
  const answerCorrect = useSelector(getProvidedAnswerIsCorrect);

  const { type, text, successText, failText } = stageConfig;
  const completeText =
    type !== STAGE_TYPES.CHOICE || answerCorrect ? successText : failText;

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
        {canMoveToPreviousStage && (
          <Button onClick={() => dispatch(moveToPreviousStage())}>BACK</Button>
        )}
        {canMoveToNextStage && (
          <Button type="primary" onClick={() => dispatch(moveToNextScreen())}>
            CONTINUE
          </Button>
        )}
      </NavButtons>
    </StageWrapper>
  );
}
