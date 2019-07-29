import React from "react";
import { connect } from "react-redux";
import Test from "./Test";
import {
  getStageConfig,
  getCanMoveToNextStage
} from "../selectors/progressSelectors";
import {
  moveToNextStage,
  moveToPreviousStage
} from "../actions/progressActions";

const mapStateToProps = state => ({
  stageConfig: getStageConfig(state),
  canMoveToNextStage: getCanMoveToNextStage(state)
});

function Stage({ stageConfig, canMoveToNextStage, onClickNext, onClickBack }) {
  const { type, text, ...config } = stageConfig;
  return (
    <div className="stage">
      {text.map((t, index) => (
        <p key={index}>{t}</p>
      ))}
      {type === "TEST" ? <Test {...config} /> : null}
      {canMoveToNextStage && <button onClick={onClickNext}>Continue</button>}
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
