import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import Prompt from "./Prompt";
import { getMatches } from "../selectors/inputSelectors";

const SearchBody = styled.div`
  width: 100%;
  background-color: #adff12;
  color: black;
  padding: 18px;
  margin: 18px 0;
`;

const mapStateToProps = state => ({
  matches: getMatches(state)
});

function Test({ searchBody, matches }) {
  console.log(matches);
  return (
    <div>
      {searchBody ? <SearchBody>{searchBody}</SearchBody> : null}
      <Prompt />
    </div>
  );
}

export default connect(
  mapStateToProps,
  {}
)(Test);
