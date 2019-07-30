import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import Test from "./Test";
import Button from "./styled/Button";
import {
  getStageConfig,
  getCanMoveToNextStage,
  getCanMoveToPreviousStage
} from "../selectors/progressSelectors";
import {
  moveToNextStage,
  moveToPreviousStage
} from "../actions/progressActions";

const StageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  height: 100vh;
  margin-left: 20px;
`;

const NavButtons = styled.div`
  height: 70px;
  padding: 100px 0;
`;

const mapStateToProps = state => ({
  stageConfig: getStageConfig(state),
  canMoveToNextStage: getCanMoveToNextStage(state),
  canMoveToPreviousStage: getCanMoveToPreviousStage(state)
});

function Stage({
  stageConfig,
  canMoveToNextStage,
  canMoveToPreviousStage,
  onClickNext,
  onClickBack
}) {
  const { type, text, ...config } = stageConfig;
  return (
    <StageWrapper>
      {text.map((t, index) => (
        <p key={index}>{t}</p>
      ))}
      {type === "TEST" ? <Test {...config} /> : null}
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
