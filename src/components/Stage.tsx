import React from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/store';
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
import { Stage, StageKey } from '../types';

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

function renderStageContent(config: Stage, id: StageKey) {
  switch (config.type) {
    case STAGE_TYPES.REGEX:
      return <Test {...config} />;
    case STAGE_TYPES.CHOICE:
      return <Choice {...config} stageId={id} />;
    default:
      return null;
  }
}

function renderTextLines(textLines: Stage['text']) {
  return textLines.map((t) => (
    // eslint-disable-next-line react/no-array-index-key
    // eslint-disable-next-line react/no-danger
    <p key={`${t}`} dangerouslySetInnerHTML={{ __html: t }} />
  ));
}

export default function StageComponent() {
  const dispatch = useAppDispatch();
  const stageId = useAppSelector(getStageId);
  const stageConfig = useAppSelector(getStageConfig);
  const canMoveToNextStage = useAppSelector(getCanMoveToNextStage);
  const canMoveToPreviousStage = useAppSelector(getCanMoveToPreviousStage);
  const answerCorrect = useAppSelector(getProvidedAnswerIsCorrect);

  // @ts-expect-error needs fixing
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
          <Button use="primary" onClick={() => dispatch(moveToNextScreen())}>
            CONTINUE
          </Button>
        )}
      </NavButtons>
    </StageWrapper>
  );
}
