import React from "react";
import { connect } from "react-redux";
import Prompt from "./Prompt";
import { getMatches } from "../selectors/inputSelectors";

const mapStateToProps = state => ({
  matches: getMatches(state)
});

function Test({ searchBody }) {
  return (
    <div>
      {searchBody ? <div style={{ outline: "green" }}>{searchBody}</div> : null}
      <Prompt />
    </div>
  );
}

export default connect(
  mapStateToProps,
  {}
)(Test);
