import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Button from './styled/Button';
import UnstyledList from './styled/UnstyledList';
import {
  submitAnswer,
  getProvidedAnswerForStage,
} from '../slices/moduleProgress';
import { AppState } from '../store';
import { ChoiceStage, StageKey } from '../types';
import { useAppDispatch, useAppSelector } from '../hooks/store';

const check = <span>&#10004;</span>;
const cross = <span className="error">&#x2716;</span>;

const Choices = styled(UnstyledList)`
  display: inline-block;
  li {
    display: table-row;
    > div {
      display: table-cell;
      &:last-child {
        padding-left: 14px;
      }
      .error {
        color: #ff0000;
      }
    }
    ${Button} {
      width: 100%;
      margin-bottom: 12px;
      text-align: left;
    }
  }
`;

function renderResultIcon(
  index: number,
  providedAnswer: ChoiceStage['answer'],
  actualAnswer: ChoiceStage['answer']
) {
  if (providedAnswer !== undefined) {
    if (index === providedAnswer) {
      return providedAnswer === actualAnswer ? check : cross;
    }
    if (index === actualAnswer) {
      return check;
    }
  }
  return null;
}

type Props = ChoiceStage & {
  stageId: StageKey;
};

export default function Choice({ choices, answer, stageId }: Props) {
  const dispatch = useAppDispatch();
  const providedAnswer = useAppSelector(getProvidedAnswerForStage);
  return (
    <Choices>
      {choices.map((choice, i) => (
        <li key={`${choice}`}>
          <div>
            <Button
              onClick={() => {
                if (providedAnswer === undefined) {
                  dispatch(submitAnswer(stageId, i));
                }
              }}
              disabled={providedAnswer !== undefined}
              use={i === providedAnswer ? 'primary' : undefined}
            >
              {choice}
            </Button>
          </div>
          <div>{renderResultIcon(i, providedAnswer, answer)}</div>
        </li>
      ))}
    </Choices>
  );
}
