import React from "react";
import { connect } from "react-redux";
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
    <div className="stage">
      {text.map((t, index) => (
        <p key={index}>{t}</p>
      ))}
      {type === "TEST" ? <Test {...config} /> : null}
      {canMoveToPreviousStage && <Button onClick={onClickBack}>BACK</Button>}
      {canMoveToNextStage && (
        <Button type="primary" onClick={onClickNext}>
          CONTINUE
        </Button>
      )}
    </div>
  );
}
export default connect(
  mapStateToProps,
  {
    onClickNext: moveToNextStage,
    onClickBack: moveToPreviousStage
  }
)(Stage);
