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
  box-sizing: border-box;
  .matched {
    color: #adff12;
    background-color: black;
  }
`;

const mapStateToProps = state => ({
  matches: getMatches(state)
});

const generateHighlightedSearchBody = (searchBody, matches) => {
  if (matches && matches.length) {
    const textEls = [];
    let currentLength = 0;
    matches.forEach((match, i) => {
      const [matchedStr] = match;
      textEls.push(
        <span key={`unmatched-${i}`} className="unmatched">
          {searchBody.substring(currentLength, match.index)}
        </span>,
        <span key={`matched-${i}`} className="matched">
          {matchedStr}
        </span>
      );
      currentLength = match.index + matchedStr.length;
    });
    textEls.push(
      <span key={`unmatched-${matches.length}`} className="unmatched">
        {searchBody.substring(currentLength)}
      </span>
    );
    return textEls;
  }
  return <span className="unmatched">{searchBody}</span>;
};

function Test({ searchBody, matches }) {
  console.log(matches);
  return (
    <div>
      {searchBody ? (
        <SearchBody>
          {generateHighlightedSearchBody(searchBody, matches)}
        </SearchBody>
      ) : null}
      <Prompt />
    </div>
  );
}

export default connect(
  mapStateToProps,
  {}
)(Test);
