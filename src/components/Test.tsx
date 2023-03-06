import React from 'react';
import styled from 'styled-components';
import Prompt from './Prompt';
import Hint from './Hint';
import { getMatches } from '../slices/input';
import { useAppSelector } from '../hooks/store';
import { RegexStage } from '../types';

const SearchBody = styled.div`
  width: 100%;
  background-color: #adff12;
  color: black;
  padding: 18px;
  margin: 18px 0;
  box-sizing: border-box;
  word-break: break-word;
  .matched {
    color: #adff12;
    background-color: black;
  }
`;

const TestWrapper = styled.div`
  position: relative;
`;

const generateHighlightedSearchBody = (
  searchBody: NonNullable<RegexStage['searchBody']>,
  matches: ReturnType<typeof getMatches>
) => {
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

type Props = RegexStage;

export default function Test({ searchBody, hint }: Props) {
  const matches = useAppSelector(getMatches);
  return (
    <TestWrapper>
      {hint && <Hint hint={hint} />}
      {searchBody ? (
        <SearchBody>
          {generateHighlightedSearchBody(searchBody, matches)}
        </SearchBody>
      ) : null}
      <Prompt />
    </TestWrapper>
  );
}
