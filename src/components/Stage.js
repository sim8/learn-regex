import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import Test from "./Test";
import Choice from "./Choice";
import Button from "./styled/Button";
import {
  getStageConfig,
  getCanMoveToNextStage,
  getCanMoveToPreviousStage,
  getStageId
} from "../selectors/progressSelectors";
import {
  moveToNextStage,
  moveToPreviousStage
} from "../actions/progressActions";
import { STAGE_TYPES } from "../constants/lessonConfig";

const StageWrapper = styled.div`
  .main-text {
    padding-top: 15vh;
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
  canMoveToPreviousStage: getCanMoveToPreviousStage(state)
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

function Stage({
  stageConfig,
  stageId,
  canMoveToNextStage,
  canMoveToPreviousStage,
  onClickNext,
  onClickBack
}) {
  const { text } = stageConfig;
  return (
    <StageWrapper>
      <div className="main-text">
        {text.map((t, index) => (
          <p key={index}>{t}</p>
        ))}
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
export default connect(
  mapStateToProps,
  {
    onClickNext: moveToNextStage,
    onClickBack: moveToPreviousStage
  }
)(Stage);
