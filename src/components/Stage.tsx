import React from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/store';
import styled from 'styled-components';
import { mobile } from '../styles/media';
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

  ${mobile} {
    height: auto;
    min-height: calc(100svh - 60px);
    margin: 0;
    box-sizing: border-box;
    gap: 16px;
    padding: 0 20px 12px;

    .main-text {
      padding-top: 52px;
      min-height: 0;
      overflow-wrap: anywhere;

      p {
        margin: 0 0 16px;
      }

      > p:last-child,
      .complete-text p:last-child {
        margin-bottom: 0;
      }
    }
  }
`;

const NavButtons = styled.div`
  height: 70px;
  padding-bottom: 10vh;

  ${mobile} {
    height: auto;
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    padding-bottom: 0;

    > button {
      margin-right: 0;
    }
  }
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
