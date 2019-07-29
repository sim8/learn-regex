import React from "react";
import { connect } from "react-redux";
import Prompt from "./Prompt";
import { getStageConfig } from "../selectors/progressSelectors";

const mapStateToProps = state => ({
  stageConfig: getStageConfig(state)
});

function Stage({ stageConfig }) {
  const { type, text, ...rest } = stageConfig;
  return (
    <div className="stage">
      {text.map((t, index) => (
        <p key={index}>{t}</p>
      ))}
      <Prompt />
    </div>
  );
}
export default connect(
  mapStateToProps,
  {}
)(Stage);
