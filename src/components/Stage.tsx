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
import { STAGE_TYPES, STAGES } from '../constants/lessonConfig';
import { Stage, StageKey } from '../types';
import ModuleProgressBar from './ModuleProgressBar';

const StageWrapper = styled.div`
  .main-text {
    padding-top: clamp(50px, 10svh, 100px);
    overflow-wrap: anywhere;
    .complete-text {
      font-style: italic;
    }
  }
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: calc(100svh - 60px);
  box-sizing: border-box;
  gap: 40px;
  padding: 0 20px 24px;
`;

const NavButtons = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  padding-bottom: 4svh;
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
      {stageId !== STAGES.GREETING && <ModuleProgressBar />}
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
