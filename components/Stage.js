import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import PatternQuestion from "./questions/PatternQuestion";
import MultiChoiceQuestion from "./questions/MultiChoiceQuestion";
import Button from "./styled/Button";
import FullScreenFlexBox from "./styled/FullScreenFlexBox";
import {
  getStageConfig,
  getCanMoveToNextStage,
  getCanMoveToPreviousStage,
  getStageId,
  getProvidedAnswerIsCorrect
} from "../selectors/progressSelectors";
import {
  moveToNextStage,
  moveToPreviousStage
} from "../actions/progressActions";
import { STAGE_TYPES } from "../constants/lessonConfig";

const NavButtons = styled.div`
  height: 70px;
  padding-bottom: 10vh;
`;

const mapStateToProps = state => ({
  stageId: getStageId(state),
  stageConfig: getStageConfig(state),
  canMoveToNextStage: getCanMoveToNextStage(state),
  canMoveToPreviousStage: getCanMoveToPreviousStage(state),
  answerCorrect: getProvidedAnswerIsCorrect(state)
});

function renderStageContent({ type, ...config }, id) {
  switch (type) {
    case STAGE_TYPES.REGEX:
      return <PatternQuestion {...config} stageId={id} />;
    case STAGE_TYPES.CHOICE:
      return <MultiChoiceQuestion {...config} stageId={id} />;
    default:
      return null;
  }
}

function renderTextLines(textLines) {
  return textLines.map((t, index) => (
    <p key={index} dangerouslySetInnerHTML={{ __html: t }} />
  ));
}

function Stage({
  stageConfig,
  stageId,
  canMoveToNextStage,
  canMoveToPreviousStage,
  answerCorrect,
  onClickNext,
  onClickBack
}) {
  const { type, text, successText, failText } = stageConfig;
  const completeText =
    type !== STAGE_TYPES.CHOICE || answerCorrect ? successText : failText;
  return (
    <FullScreenFlexBox>
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
    </FullScreenFlexBox>
  );
}
export default connect(mapStateToProps, {
  onClickNext: moveToNextStage,
  onClickBack: moveToPreviousStage
})(Stage);
