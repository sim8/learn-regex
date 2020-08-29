import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Button from './styled/Button';
import UnstyledList from './styled/UnstyledList';
import { submitAnswer as submitAnswerAction } from '../actions/progressActions';
import { getProvidedAnswerForStage } from '../selectors/progressSelectors';

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

const mapStateToProps = state => ({
  providedAnswer: getProvidedAnswerForStage(state),
});

function renderResultIcon(index, providedAnswer, actualAnswer) {
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

function Choice({ choices, submitAnswer, answer, providedAnswer, stageId }) {
  return (
    <Choices>
      {choices.map((choice, i) => (
        <li key={`${choice}`}>
          <div>
            <Button
              onClick={() => {
                if (providedAnswer === undefined) {
                  submitAnswer(stageId, i);
                }
              }}
              disabled={providedAnswer !== undefined}
              type={i === providedAnswer ? 'primary' : null}
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

export default connect(mapStateToProps, {
  submitAnswer: submitAnswerAction,
})(Choice);
