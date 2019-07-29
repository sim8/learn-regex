import React from "react";
import { connect } from "react-redux";
import Prompt from "./Prompt";
import { getStageConfig } from "../selectors/progressSelectors";

const mapStateToProps = state => ({
  stageConfig: getStageConfig(state)
});

function Game({ stageConfig }) {
  const { type, text } = stageConfig;
  return (
    <div className="game">
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
)(Game);
